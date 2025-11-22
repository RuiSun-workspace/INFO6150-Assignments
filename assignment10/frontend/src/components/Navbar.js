import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { authService } from '../services/api';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  const isAdmin = user && user.type === 'admin';
  const isEmployee = user && user.type === 'employee';

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <WorkIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={Link}
            to={isAdmin ? '/admin/employees' : '/jobs'}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Job Portal {isAdmin ? '- Admin' : isEmployee ? '- Employee' : ''}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAdmin && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/employees"
                  startIcon={<PeopleIcon />}
                >
                  Employees
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/add-job"
                  startIcon={<AddCircleIcon />}
                >
                  Add Job
                </Button>
              </>
            )}

            {isEmployee && (
              <Button
                color="inherit"
                component={Link}
                to="/jobs"
                startIcon={<WorkIcon />}
              >
                Jobs
              </Button>
            )}

            {user && (
              <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                {user.fullName}
              </Typography>
            )}

            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
