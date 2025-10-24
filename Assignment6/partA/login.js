$(document).ready(function() {
    const users = [
        { email: 'john.doe@northeastern.edu', password: 'password123' },
        { email: 'jane.smith@northeastern.edu', password: 'welcome456' },
        { email: 'test.user@northeastern.edu', password: 'testing789' }
    ];

    let isEmailValid = false;
    let isPasswordValid = false;

    function validateEmail() {
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const northeasternPattern = /@northeastern\.edu$/;

        $('#emailError').text('');

        if (email === '') {
            $('#emailError').text('Please enter a valid Northeastern email');
            isEmailValid = false;
            return false;
        }

        if (!emailPattern.test(email)) {
            $('#emailError').text('Please enter a valid Northeastern email');
            isEmailValid = false;
            return false;
        }

        if (!northeasternPattern.test(email)) {
            $('#emailError').text('Please enter a valid Northeastern email');
            isEmailValid = false;
            return false;
        }

        isEmailValid = true;
        return true;
    }

    function validatePassword() {
        const password = $('#password').val();

        $('#passwordError').text('');

        if (password === '') {
            $('#passwordError').text('Password cannot be empty');
            isPasswordValid = false;
            return false;
        }

        if (password.length < 8) {
            $('#passwordError').text('Password must be at least 8 characters');
            isPasswordValid = false;
            return false;
        }

        isPasswordValid = true;
        return true;
    }

    function updateLoginButton() {
        if (isEmailValid && isPasswordValid) {
            $('#loginBtn').prop('disabled', false);
        } else {
            $('#loginBtn').prop('disabled', true);
        }
    }

    $('#email').on('keyup', function() {
        validateEmail();
        updateLoginButton();
    });

    $('#email').on('blur', function() {
        validateEmail();
        updateLoginButton();
    });

    $('#email').on('focus', function() {
        $('#emailError').text('');
    });

    $('#password').on('keyup', function() {
        validatePassword();
        updateLoginButton();
    });

    $('#password').on('blur', function() {
        validatePassword();
        updateLoginButton();
    });

    $('#password').on('focus', function() {
        $('#passwordError').text('');
    });

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        $('#loginError').text('');
        $('#loginSuccess').text('');

        const emailValid = validateEmail();
        const passwordValid = validatePassword();

        if (!emailValid || !passwordValid) {
            return;
        }

        const email = $('#email').val().trim();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const username = email.split('@')[0].replace('.', ' ').split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const sessionData = {
                username: username,
                email: email,
                loginTimestamp: new Date().toISOString(),
                isLoggedIn: true
            };

            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('userSession', JSON.stringify(sessionData));

            $('#loginSuccess').text('Login successful! Redirecting...').fadeIn(400);

            setTimeout(function() {
                window.location.href = 'calculator.html';
            }, 2000);

        } else {
            $('#loginError').text('Invalid email or password');
        }
    });

    const sessionData = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
    if (sessionData) {
        const session = JSON.parse(sessionData);
        if (session.isLoggedIn) {
            window.location.href = 'calculator.html';
        }
    }
});
