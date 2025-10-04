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


