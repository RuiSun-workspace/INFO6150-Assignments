// Validate password strength
const validatePassword = (password) => {
  // Minimum 8 characters, at least one uppercase, one lowercase, one digit, one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return passwordRegex.test(password);
};

// Validate full name
const validateFullName = (fullName) => {
  // Only alphabetic characters and spaces
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(fullName);
};

// Validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  validatePassword,
  validateFullName,
  validateEmail
};
