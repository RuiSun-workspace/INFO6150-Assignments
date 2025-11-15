import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Find Your Dream Job',
      description: 'Browse through hundreds of job listings from top companies',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: 'Top Companies',
      description: 'Connect with leading organizations in various industries',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Career Growth',
      description: 'Advance your career with opportunities that match your skills',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Competitive Salaries',
      description: 'Find positions with excellent compensation packages',
    },
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
            p: 6,
            mb: 6,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Welcome to Job Portal
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Your Gateway to Amazing Career Opportunities
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/jobs"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Browse Jobs
            </Button>
            <Button
              component={Link}
              to="/companies"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              View Companies
            </Button>
          </Box>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" fontWeight="bold">
            Why Choose Our Platform?
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            We connect talented professionals with exceptional opportunities
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      p: 2,
                      mb: 2,
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Paper
          sx={{
            p: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                500+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Active Jobs
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                200+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Companies
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                10K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Happy Candidates
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Explore our job listings and find your perfect match today!
          </Typography>
          <Button
            component={Link}
            to="/jobs"
            variant="contained"
            size="large"
            sx={{ minWidth: 200 }}
          >
            Explore Jobs
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
