import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { userService } from '../services/api';
import BusinessIcon from '@mui/icons-material/Business';
import ImageIcon from '@mui/icons-material/Image';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userService.getUserImages();
      setCompanies(data);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load company images. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
            p: 4,
            mb: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Company Showcase
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Explore our partner companies
          </Typography>
        </Paper>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Empty State */}
        {!loading && !error && companies.length === 0 && (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <ImageIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              No company images available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Company images will appear here once users upload them through the backend API.
            </Typography>
          </Paper>
        )}

        {/* Company Gallery */}
        {!loading && !error && companies.length > 0 && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="text.secondary">
                {companies.length} {companies.length === 1 ? 'company' : 'companies'} featured
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {companies.map((company, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={company.imagePath}
                      alt={company.name}
                      sx={{
                        objectFit: 'cover',
                        backgroundColor: 'grey.200',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x200?text=Company+Logo';
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1,
                        }}
                      >
                        <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6" component="h3" fontWeight="bold">
                          {company.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Partner Company
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Info Section */}
        <Paper sx={{ p: 3, mt: 4, backgroundColor: 'info.light' }}>
          <Typography variant="body1" color="text.secondary">
            <strong>Note:</strong> Company images are fetched from the backend API. 
            Make sure your Assignment 8 backend server is running on port 3000 and users 
            have uploaded images using the <code>/user/uploadImage</code> endpoint.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default CompanyShowcase;
