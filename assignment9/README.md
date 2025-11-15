# Assignment 9: React Job Portal

A comprehensive job portal application built with React, Material UI, and Axios. This application connects to the backend API from Assignment 8 to provide user authentication and company showcase features.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Available Pages](#available-pages)
- [API Integration](#api-integration)
- [Key Functionalities](#key-functionalities)

## Features

- **User Authentication**: Secure login using credentials from Assignment 8 backend
- **Session Management**: Maintains user sessions using sessionStorage
- **Responsive Design**: Mobile-friendly interface using Material UI
- **Job Listings**: Browse and search through available job positions
- **Company Showcase**: Display company images fetched from backend API
- **Modern UI**: Clean and professional interface with Material UI components
- **Protected Routes**: Secure navigation with route protection

## 🛠 Technologies Used

- **React** (v18.3.1) - Frontend framework
- **Material UI** (v6.3.0) - UI component library
- **React Router DOM** (v7.1.1) - Client-side routing
- **Axios** (v1.7.9) - HTTP client for API requests
- **Emotion** - CSS-in-JS styling solution

## 📄 Available Pages

### 1. Login (`/login`)
- User authentication using Assignment 8 credentials
- Session management
- Form validation
- Responsive design

### 2. Home (`/`)
- Welcome page with hero section
- Platform features overview
- Statistics display
- Call-to-action buttons

### 3. About (`/about`)
- Company mission and story
- Core values
- Team members
- Impact statistics

### 4. Job Listings (`/jobs`)
- Display all available job positions
- Search functionality by title, description, or skills
- Job cards with detailed information:
  - Job title
  - Description
  - Required skills (as chips)
  - Salary range
  - Last updated timestamp
- Apply button linking to job application

### 5. Company Showcase (`/companies`)
- Gallery of company images
- Images fetched from backend API
- Display company names
- Responsive grid layout
- Error handling for missing images

### 6. Contact (`/contact`)
- Contact form
- Company contact information
- Office hours
- Interactive form with validation

## 🔌 API Integration

### Backend Connection

The application connects to the Assignment 8 backend API at `http://localhost:3000`.

### API Endpoints Used:

1. **GET `/user/getAll`**
   - Used for login authentication
   - Fetches all users for validation
   - Retrieves user images for Company Showcase

2. **POST `/user/uploadImage`** (backend feature)
   - Used by backend to upload company images
   - Images are then displayed in Company Showcase

### API Service Structure (`src/services/api.js`):

\`\`\`javascript
- authService
  - login(email, password)
  - logout()
  - isAuthenticated()
  - getCurrentUser()

- userService
  - getAllUsers()
  - getUserImages()
\`\`\`

## ⚙️ Key Functionalities

### 1. Login and Session Management
- **Login Process**: 
  - User enters email and password
  - System fetches all users from backend
  - Validates credentials
  - Creates session in sessionStorage
  - Redirects to home page

- **Session Persistence**:
  - User data stored in sessionStorage
  - Persists across page refreshes
  - Cleared on logout

- **Logout Feature**:
  - Clears session data
  - Redirects to login page
  - Available from all pages via navbar

### 2. Protected Routes
- All main pages are protected
- Unauthenticated users redirected to login
- Session validated on each route change

### 3. Material UI Components Used
- **AppBar & Toolbar** - Navigation
- **Cards** - Job listings and company showcase
- **Typography** - Text styling
- **Button** - Interactive elements
- **TextField** - Form inputs
- **Grid** - Responsive layouts
- **Paper** - Content containers
- **Chip** - Skill tags
- **Alert** - User notifications

### 4. Dynamic Content Rendering
- Job listings mapped using `.map()` function
- Company images dynamically fetched and rendered
- Search functionality filters jobs in real-time

### 5. Responsive Design
- Mobile-first approach
- Breakpoints for different screen sizes
- Collapsible navigation on mobile


