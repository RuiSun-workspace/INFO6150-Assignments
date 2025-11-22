import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } from '../redux/slices/jobsSlice';
import { jobService } from '../services/api';
import Navbar from '../components/Navbar';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(fetchJobsStart());
      try {
        const data = await jobService.getAllJobs();
        dispatch(fetchJobsSuccess(data.jobs));
      } catch (err) {
        dispatch(fetchJobsFailure(err.message || 'Failed to fetch jobs'));
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WorkIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Available Jobs
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Browse all available job opportunities
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : jobs.length === 0 ? (
          <Paper elevation={3} sx={{ p: 8, textAlign: 'center' }}>
            <WorkIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No jobs available at the moment
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Please check back later for new opportunities
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="div" fontWeight="bold">
                        {job.companyName}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      color="primary"
                      fontWeight="bold"
                    >
                      {job.jobTitle}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {job.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <AttachMoneyIcon sx={{ mr: 0.5, color: 'success.main' }} />
                      <Chip
                        label={`$${job.salary.toLocaleString()}`}
                        color="success"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>

                    {job.createdAt && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Total Jobs: {jobs.length}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Jobs;
