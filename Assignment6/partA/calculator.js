$(document).ready(function() {
    function checkAuthentication() {
        const sessionData = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
        
        if (!sessionData) {
            window.location.href = 'login.html';
            return null;
        }

        const session = JSON.parse(sessionData);
        if (!session.isLoggedIn) {
            window.location.href = 'login.html';
            return null;
        }

        return session;
    }

    const session = checkAuthentication();
    if (!session) return;

    $('#welcomeMessage').text(`Welcome, ${session.username}!`);

    const calculate = (num1, num2, operation) => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        switch(operation) {
            case 'add':
                return n1 + n2;
            case 'subtract':
                return n1 - n2;
            case 'multiply':
                return n1 * n2;
            case 'divide':
                if (n2 === 0) {
                    return 'Cannot divide by zero';
                }
                return n1 / n2;
            default:
                return 'Invalid operation';
        }
    };

    function validateNumber(value, errorElementId) {
        const $errorElement = $(errorElementId);
        $errorElement.text('');

        if (value.trim() === '') {
            $errorElement.text('Please enter a valid number');
            return false;
        }

        const numberPattern = /^-?\d*\.?\d+$/;
        if (!numberPattern.test(value.trim())) {
            $errorElement.text('Please enter a valid number');
            return false;
        }

        return true;
    }

    $('#number1').on('keyup blur', function() {
        validateNumber($(this).val(), '#number1Error');
    });

    $('#number1').on('focus', function() {
        $('#number1Error').text('');
    });

    $('#number2').on('keyup blur', function() {
        validateNumber($(this).val(), '#number2Error');
    });

    $('#number2').on('focus', function() {
        $('#number2Error').text('');
    });

    $('.operation-btn').on('click', function() {
        const num1 = $('#number1').val().trim();
        const num2 = $('#number2').val().trim();
        const operation = $(this).data('operation');

        const isNum1Valid = validateNumber(num1, '#number1Error');
        const isNum2Valid = validateNumber(num2, '#number2Error');

        if (!isNum1Valid || !isNum2Valid) {
            $('#result').val('');
            return;
        }

        const result = calculate(num1, num2, operation);

        $('#result')
            .val(result)
            .css('color', typeof result === 'number' ? '#27ae60' : '#e74c3c')
            .animate({ opacity: 0.5 }, 200)
            .animate({ opacity: 1 }, 200);
    });

    let lastOperation = 'add';
    $('.operation-btn').on('click', function() {
        lastOperation = $(this).data('operation');
    });

    $('#number1, #number2').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $(`.operation-btn[data-operation="${lastOperation}"]`).click();
        }
    });

    $('#logoutBtn').on('click', function() {
        sessionStorage.removeItem('userSession');
        localStorage.removeItem('userSession');

        $('.container').fadeOut(500, function() {
            window.location.href = 'login.html';
        });
    });

    $('#number1, #number2').on('input', function() {
        $('#result').val('').css('color', '#333');
    });
});
