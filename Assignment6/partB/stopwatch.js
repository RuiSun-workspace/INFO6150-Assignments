$(document).ready(function() {
    let seconds = 0;
    let intervalId = null;
    let isRunning = false;
    let isPaused = false;

    const today = new Date().toISOString().split('T')[0];
    $('#eventDate').val(today);

    function validateDate() {
        const date = $('#eventDate').val();
        $('#dateError').text('');

        if (!date) {
            $('#dateError').text('Please select a date');
            return false;
        }

        return true;
    }

    function validateEventName() {
        const name = $('#eventName').val().trim();
        $('#nameError').text('');

        if (!name) {
            $('#nameError').text('Event name is required');
            return false;
        }

        if (name.length < 3) {
            $('#nameError').text('Event name must be at least 3 characters');
            return false;
        }

        if (name.length > 100) {
            $('#nameError').text('Event name too long (max 100 characters)');
            return false;
        }

        const validPattern = /^[a-zA-Z0-9\s\-']+$/;
        if (!validPattern.test(name)) {
            $('#nameError').text('Event name contains invalid characters');
            return false;
        }

        return true;
    }

    $('#eventDate').on('focus', function() {
        $('#dateError').text('');
    });

    $('#eventName').on('focus', function() {
        $('#nameError').text('');
    });

    $('#eventName').on('keyup blur', function() {
        if ($(this).val().trim()) {
            validateEventName();
        }
    });

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateDisplay() {
        $('#timerDisplay').text(formatTime(seconds));
    }

    function incrementTimer() {
        return new Promise((resolve) => {
            seconds++;
            updateDisplay();
            resolve();
        });
    }

    async function startTimer() {
        intervalId = setInterval(async () => {
            await incrementTimer();
        }, 1000);
    }

    function stopTimer() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function showNotification(message, type = 'success') {
        const $notification = $('#notification');
        $notification
            .text(message)
            .removeClass('success error info')
            .addClass(type)
            .addClass('show');

        setTimeout(() => {
            $notification.removeClass('show');
        }, 3000);
    }

    async function saveSession() {
        return new Promise((resolve) => {
            const date = $('#eventDate').val();
            const name = $('#eventName').val().trim();
            const duration = seconds;

            const session = {
                id: Date.now(),
                date: date,
                eventName: name,
                duration: duration,
                formattedDuration: formatTime(duration),
                timestamp: new Date().toISOString()
            };

            let sessions = JSON.parse(localStorage.getItem('stopwatchSessions') || '[]');
            sessions.unshift(session); 
            localStorage.setItem('stopwatchSessions', JSON.stringify(sessions));

            resolve(session);
        });
    }

    async function loadSessions(filterDate = null) {
        return new Promise((resolve) => {
            let sessions = JSON.parse(localStorage.getItem('stopwatchSessions') || '[]');

            if (filterDate) {
                sessions = sessions.filter(s => s.date === filterDate);
            }

            const $historyList = $('#historyList');
            $historyList.empty();

            if (sessions.length === 0) {
                $historyList.html('<p class="no-sessions">No sessions recorded yet</p>');
            } else {
                sessions.forEach(session => {
                    const $item = $(`
                        <div class="history-item">
                            <div class="history-item-header">
                                <span class="history-item-date">${formatDate(session.date)}</span>
                                <span class="history-item-duration">${session.formattedDuration}</span>
                            </div>
                            <div class="history-item-name">${escapeHtml(session.eventName)}</div>
                        </div>
                    `);
                    $historyList.append($item);
                });
            }

            updateStatistics(filterDate ? sessions : null);

            resolve(sessions);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function updateStatistics(filteredSessions = null) {
        const sessions = filteredSessions || JSON.parse(localStorage.getItem('stopwatchSessions') || '[]');
        
        const totalSessions = sessions.length;
        const totalSeconds = sessions.reduce((sum, session) => sum + session.duration, 0);

        $('#totalSessions').text(totalSessions);
        $('#totalTime').text(formatTime(totalSeconds));
    }

    $('#startBtn').on('click', async function() {
        const isDateValid = validateDate();
        const isNameValid = validateEventName();

        if (!isDateValid || !isNameValid) {
            return;
        }

        isRunning = true;
        isPaused = false;

        $('#eventDate, #eventName').prop('disabled', true);

        $(this).prop('disabled', true);
        $('#pauseBtn').prop('disabled', false);
        $('#stopBtn').prop('disabled', false);
        $('#resetBtn').prop('disabled', true);

        await startTimer();

        showNotification('Timer started!', 'info');
    });

    $('#pauseBtn').on('click', async function() {
        if (isPaused) {
            isPaused = false;
            $(this).text('Pause').removeClass('resume');
            await startTimer();
            showNotification('Timer resumed!', 'info');
        } else {
            isPaused = true;
            $(this).text('Resume').addClass('resume');
            stopTimer();
            showNotification('Timer paused', 'info');
        }
    });

    $('#stopBtn').on('click', async function() {
        stopTimer();
        isRunning = false;
        isPaused = false;

        const session = await saveSession();

        $('#eventDate, #eventName').prop('disabled', false);
        $('#startBtn').prop('disabled', false);
        $('#pauseBtn').prop('disabled', true).text('Pause').removeClass('resume');
        $('#stopBtn').prop('disabled', true);
        $('#resetBtn').prop('disabled', false);

        await loadSessions();

        showNotification('Session saved successfully!', 'success');
    });

    $('#resetBtn').on('click', function() {
        if (isRunning) {
            if (confirm('Timer is running. Are you sure you want to reset without saving?')) {
                stopTimer();
                isRunning = false;
                isPaused = false;
                seconds = 0;
                updateDisplay();

                $('#eventDate, #eventName').prop('disabled', false);
                $('#startBtn').prop('disabled', false);
                $('#pauseBtn').prop('disabled', true).text('Pause').removeClass('resume');
                $('#stopBtn').prop('disabled', true);
                $('#resetBtn').prop('disabled', false);

                showNotification('Timer reset', 'info');
            }
        } else {
            seconds = 0;
            updateDisplay();
            showNotification('Timer reset', 'info');
        }
    });

    $('#filterDate').on('change', async function() {
        const filterDate = $(this).val();
        if (filterDate) {
            await loadSessions(filterDate);
            showNotification('Filter applied', 'info');
        }
    });

    $('#clearFilterBtn').on('click', async function() {
        $('#filterDate').val('');
        await loadSessions();
        showNotification('Filter cleared', 'info');
    });


    loadSessions();

    window.addEventListener('beforeunload', function(e) {
        if (isRunning) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
});
