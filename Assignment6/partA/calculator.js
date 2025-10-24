$(document).ready(function() {
    // Authentication check
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

    // Check authentication on page load
    const session = checkAuthentication();
    if (!session) return;

    // Display welcome message
    $('#welcomeMessage').text(`Welcome, ${session.username}!`);

    // Single arrow function for all operations
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

    // Validate number input
    function validateNumber(value, errorElementId) {
        const $errorElement = $(errorElementId);
        $errorElement.text('');

        if (value.trim() === '') {
            $errorElement.text('Please enter a valid number');
            return false;
        }

        // Check if it's a valid number (including decimals and negatives)
        const numberPattern = /^-?\d*\.?\d+$/;
        if (!numberPattern.test(value.trim())) {
            $errorElement.text('Please enter a valid number');
            return false;
        }

        return true;
    }

    // Number 1 validation
    $('#number1').on('keyup blur', function() {
        validateNumber($(this).val(), '#number1Error');
    });

    $('#number1').on('focus', function() {
        $('#number1Error').text('');
    });

    // Number 2 validation
    $('#number2').on('keyup blur', function() {
        validateNumber($(this).val(), '#number2Error');
    });

    $('#number2').on('focus', function() {
        $('#number2Error').text('');
    });

    // Operation button click handler
    $('.operation-btn').on('click', function() {
        // Get input values
        const num1 = $('#number1').val().trim();
        const num2 = $('#number2').val().trim();
        const operation = $(this).data('operation');

        // Validate both inputs
        const isNum1Valid = validateNumber(num1, '#number1Error');
        const isNum2Valid = validateNumber(num2, '#number2Error');

        if (!isNum1Valid || !isNum2Valid) {
            $('#result').val('');
            return;
        }

        // Perform calculation using the arrow function
        const result = calculate(num1, num2, operation);

        // Display result with jQuery chaining
        $('#result')
            .val(result)
            .css('color', typeof result === 'number' ? '#27ae60' : '#e74c3c')
            .animate({ opacity: 0.5 }, 200)
            .animate({ opacity: 1 }, 200);
    });

    // Allow Enter key to trigger last used operation
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

    // Logout functionality
    $('#logoutBtn').on('click', function() {
        // Clear session
        sessionStorage.removeItem('userSession');
        localStorage.removeItem('userSession');

        // Fade out animation
        $('.container').fadeOut(500, function() {
            window.location.href = 'login.html';
        });
    });

    // Clear result when inputs change
    $('#number1, #number2').on('input', function() {
        $('#result').val('').css('color', '#333');
    });
});
