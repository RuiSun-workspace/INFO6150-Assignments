import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createJobStart,
  createJobSuccess,
  createJobFailure,
  clearCreateError,
} from '../redux/slices/jobsSlice';
import { jobService } from '../services/api';
import Navbar from '../components/Navbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddJob = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: '',
  });
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createLoading, createError } = useSelector((state) => state.jobs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    dispatch(clearCreateError());
    dispatch(createJobStart());

    try {
      const jobData = {
        ...formData,
        salary: parseFloat(formData.salary),
      };

      const result = await jobService.createJob(jobData);
      dispatch(createJobSuccess(result.job));
      setSuccess(true);
      
      // Clear form
      setFormData({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: '',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin/employees');
      }, 2000);
    } catch (err) {
      dispatch(createJobFailure(err.message || 'Failed to create job'));
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AddCircleIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Add New Job
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Create a new job posting for employees to view
          </Typography>
        </Box>

        {createError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {createError}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Job created successfully! Redirecting...
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled={createLoading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="jobTitle"
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              disabled={createLoading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              disabled={createLoading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="salary"
              label="Salary"
              name="salary"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              value={formData.salary}
              onChange={handleChange}
              disabled={createLoading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.5 }}
              disabled={createLoading}
              startIcon={createLoading ? <CircularProgress size={20} /> : <AddCircleIcon />}
            >
              {createLoading ? 'Creating Job...' : 'Create Job'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddJob;
