import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
} from '@mui/material';
import Navbar from '../components/Navbar';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';

const About = () => {
  const values = [
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our dealings.',
    },
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />,
      title: 'Innovation',
      description: 'We continuously evolve our platform to meet the changing needs of job seekers and employers.',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong relationships.',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: 'Passion',
      description: 'We are passionate about helping people find their dream careers.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder' },
    { name: 'Michael Chen', role: 'CTO' },
    { name: 'Emily Rodriguez', role: 'Head of HR' },
    { name: 'David Kim', role: 'Lead Developer' },
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {/* Header Section */}
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
            About Us
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Connecting Talent with Opportunity
          </Typography>
        </Paper>

        {/* Mission Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            At Job Portal, we are dedicated to bridging the gap between talented professionals
            and exceptional career opportunities. Our mission is to empower job seekers with
            the tools and resources they need to find their perfect match, while helping
            companies discover and recruit top talent.
          </Typography>
        </Box>

        {/* Story Section */}
        <Paper sx={{ p: 4, mb: 6, backgroundColor: 'background.default' }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Our Story
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Founded in 2020, Job Portal emerged from a simple observation: the traditional
            job search process was broken. We saw talented individuals struggling to find
            opportunities that matched their skills, while companies faced challenges in
            identifying the right candidates.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We set out to create a platform that would revolutionize how people find jobs
            and how companies recruit talent. Today, we've grown into a trusted platform
            connecting thousands of job seekers with hundreds of companies across various
            industries.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our success is measured not just in numbers, but in the stories of individuals
            who found their dream jobs and companies that discovered their perfect team members
            through our platform.
          </Typography>
        </Paper>

        {/* Values Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
            Our Core Values
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            These principles guide everything we do
          </Typography>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
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
                      display: 'inline-flex',
                    }}
                  >
                    {value.icon}
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
            Meet Our Team
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            The passionate individuals behind Job Portal
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: 'primary.main',
                      fontSize: '2rem',
                    }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
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
          <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
            Our Impact
          </Typography>
          <Grid container spacing={4} textAlign="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                4+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Years in Business
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                10K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Successful Placements
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                500+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Partner Companies
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h3" fontWeight="bold" color="primary">
                95%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Satisfaction Rate
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default About;
