import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { jobPosts } from '../data/jobPosts';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UpdateIcon from '@mui/icons-material/Update';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobPosts.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Job Listings
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Discover your next career opportunity
          </Typography>
        </Paper>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by job title, description, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Results Count */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="text.secondary">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
          </Typography>
        </Box>

        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Job Title with Icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          p: 1,
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <WorkIcon sx={{ color: 'white' }} />
                      </Box>
                      <Typography variant="h5" component="h2" fontWeight="bold">
                        {job.title}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 2 }}
                    >
                      {job.description}
                    </Typography>

                    {/* Skills */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                        fontWeight="bold"
                      >
                        Required Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {job.skills.split(',').map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill.trim()}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Salary */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoneyIcon sx={{ mr: 1, color: 'success.main' }} />
                      <Typography variant="body1" fontWeight="bold" color="success.main">
                        {job.salary}
                      </Typography>
                    </Box>

                    {/* Last Updated */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <UpdateIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {job.lastUpdated}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      endIcon={<OpenInNewIcon />}
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              No jobs found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default JobListings;
