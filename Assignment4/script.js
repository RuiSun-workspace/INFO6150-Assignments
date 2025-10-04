console.log("Form script loaded successfully!");


const aiBtn = document.getElementById('ai-assistant-btn');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

aiBtn.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});


const formSubmissions = [];

const validationState = {
    title: false,
    firstName: false,
    lastName: false,
    emailId: false,
    phoneNumber: false,
    zipcode: false,
    streetAddress1: false,
    source: false,
    drinkSelect: false,
    comments: false
};


const regex = {
    name: /^[a-zA-Z\s]{2,30}$/,
    email: /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/,
    phone: /^\(\d{3}\) \d{3}-\d{4}$/,
    zipcode: /^\d{5}$/,
    address: /^[a-zA-Z0-9\s,.\-#]{5,100}$/,
    comments: /^.{10,500}$/s
};

function validateField(fieldName, value) {
    let isValid = false;
    let errorMessage = '';

    switch(fieldName) {
        case 'title':
            const titleChecked = document.querySelector('input[name="title"]:checked');
            isValid = titleChecked !== null;
            errorMessage = 'Please select a title';
            break;

        case 'firstName':
        case 'lastName':
            if (!value || value.trim() === '') {
                errorMessage = 'This field is required';
            } else if (value.length < 2) {
                errorMessage = 'Must be at least 2 characters';
            } else if (value.length > 30) {
                errorMessage = 'Must not exceed 30 characters';
            } else if (!regex.name.test(value)) {
                errorMessage = 'Only letters and spaces allowed';
            } else {
                isValid = true;
            }
            break;

        case 'emailId':
            if (!value || value.trim() === '') {
                errorMessage = 'Email is required';
            } else if (!regex.email.test(value)) {
                errorMessage = 'Must be a valid @northeastern.edu email';
            } else {
                isValid = true;
            }
            break;

        case 'phoneNumber':
            if (!value || value.trim() === '') {
                errorMessage = 'Phone number is required';
            } else if (!regex.phone.test(value)) {
                errorMessage = 'Format: (XXX) XXX-XXXX';
            } else {
                isValid = true;
            }
            break;

        case 'zipcode':
            if (!value || value.trim() === '') {
                errorMessage = 'Zip code is required';
            } else if (!regex.zipcode.test(value)) {
                errorMessage = 'Must be exactly 5 digits';
            } else {
                isValid = true;
            }
            break;

        case 'streetAddress1':
            if (!value || value.trim() === '') {
                errorMessage = 'Street address is required';
            } else if (value.length < 5) {
                errorMessage = 'Must be at least 5 characters';
            } else if (value.length > 100) {
                errorMessage = 'Must not exceed 100 characters';
            } else if (!regex.address.test(value)) {
                errorMessage = 'Invalid address format';
            } else {
                isValid = true;
            }
            break;

        case 'source':
            const sourceChecked = document.querySelectorAll('input[name="source"]:checked');
            isValid = sourceChecked.length > 0;
            errorMessage = 'Please select at least one source';
            break;

        case 'drinkSelect':
            isValid = value && value !== '';
            errorMessage = 'Please select a drink';
            break;

        case 'comments':
            if (!value || value.trim() === '') {
                errorMessage = 'Comments are required';
            } else if (value.length < 10) {
                errorMessage = 'Must be at least 10 characters';
            } else if (value.length > 500) {
                errorMessage = 'Must not exceed 500 characters';
            } else {
                isValid = true;
            }
            break;
    }

    validationState[fieldName] = isValid;

    if (isValid) {
        hideError(fieldName);
    } else {
        showError(fieldName, errorMessage);
    }

    checkFormValidity();

    return isValid;
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(`error-${fieldName}`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(fieldName) {
    const errorElement = document.getElementById(`error-${fieldName}`);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function checkFormValidity() {
    const allValid = Object.values(validationState).every(value => value === true);
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = !allValid;
}


function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    

    value = value.substring(0, 10);

    let formattedValue = '';
    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 3);
    }
    if (value.length >= 4) {
        formattedValue += ') ' + value.substring(3, 6);
    }
    if (value.length >= 7) {
        formattedValue += '-' + value.substring(6, 10);
    }
    
    input.value = formattedValue;

    validateField('phoneNumber', formattedValue);
}



function updateCharCounter() {
    const address2Input = document.getElementById('streetAddress2');
    const counter = document.getElementById('counter-streetAddress2');
    
    if (address2Input && counter) {
        const currentLength = address2Input.value.length;
        const maxLength = 50;
        counter.textContent = `${currentLength}/${maxLength} characters used`;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded - Initializing event listeners");
    
    const titleRadios = document.querySelectorAll('input[name="title"]');
    titleRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            validateField('title', radio.value);
        });
    });

    const firstNameInput = document.getElementById('firstName');
    firstNameInput.addEventListener('input', (e) => {
        validateField('firstName', e.target.value);
    });
    
    const lastNameInput = document.getElementById('lastName');
    lastNameInput.addEventListener('input', (e) => {
        validateField('lastName', e.target.value);
    });

    const emailInput = document.getElementById('emailId');
    emailInput.addEventListener('input', (e) => {
        validateField('emailId', e.target.value);
    });

    const phoneInput = document.getElementById('phoneNumber');
    phoneInput.addEventListener('input', (e) => {
        formatPhoneNumber(e.target);
    });

    const zipInput = document.getElementById('zipcode');
    zipInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        validateField('zipcode', e.target.value);
    });
    

    const address1Input = document.getElementById('streetAddress1');
    address1Input.addEventListener('input', (e) => {
        validateField('streetAddress1', e.target.value);
    });

    const address2Input = document.getElementById('streetAddress2');
    address2Input.addEventListener('input', updateCharCounter);
    
    const sourceCheckboxes = document.querySelectorAll('input[name="source"]');
    sourceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            validateField('source', null);
        });
    });

    const drinkSelect = document.getElementById('drinkSelect');
    drinkSelect.addEventListener('change', (e) => {
        validateField('drinkSelect', e.target.value);
        handleDrinkSelection(e);
    });
    
    const commentsInput = document.getElementById('comments');
    commentsInput.addEventListener('input', (e) => {
        validateField('comments', e.target.value);
    });
    
    const form = document.getElementById('feedback-form');
    form.addEventListener('submit', handleFormSubmit);
    
    form.addEventListener('reset', () => {
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
            hideError(key);
        });
        
        const dynamicArea = document.getElementById('dynamic-checkbox-area');
        dynamicArea.innerHTML = '';
        
        updateCharCounter();
        
        checkFormValidity();
    });
    
    console.log("All event listeners initialized!");
});



