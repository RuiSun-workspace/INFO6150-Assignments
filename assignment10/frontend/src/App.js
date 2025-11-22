import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { loginSuccess } from './redux/slices/authSlice';
import { authService } from './services/api';
import Login from './pages/Login';
import AdminEmployees from './pages/AdminEmployees';
import AddJob from './pages/AddJob';
import Jobs from './pages/Jobs';
import ProtectedRoute from './components/ProtectedRoute';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#a5b4fc',
      dark: '#4c51bf',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f8f9fa',
    },
    success: {
      main: '#10b981',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Component to initialize auth state from session storage
const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in on app load
    const user = authService.getCurrentUser();
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppInitializer>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route
                path="/admin/employees"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminEmployees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-job"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AddJob />
                  </ProtectedRoute>
                }
              />
              
              {/* Employee Routes */}
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute requiredRole="employee">
                    <Jobs />
                  </ProtectedRoute>
                }
              />
              
              {/* Redirect root based on user type */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Catch all route - redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AppInitializer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
