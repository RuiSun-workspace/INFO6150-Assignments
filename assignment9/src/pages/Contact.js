import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import Navbar from '../components/Navbar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the data to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      details: ['info@jobportal.com', 'support@jobportal.com'],
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Address',
      details: ['123 Business Street', 'San Francisco, CA 94105'],
    },
  ];

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
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            We'd love to hear from you
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Send us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Have a question or feedback? Fill out the form below and we'll get back to you shortly.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you for your message! We'll get back to you soon.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={submitted}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={submitted}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={submitted}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={submitted}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      endIcon={<SendIcon />}
                      disabled={submitted}
                    >
                      {submitted ? 'Message Sent!' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Get in Touch
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Feel free to reach out through any of these channels
                </Typography>
              </Paper>

              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          p: 1.5,
                          mr: 2,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {info.title}
                      </Typography>
                    </Box>
                    {info.details.map((detail, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        color="text.secondary"
                        sx={{ ml: 8 }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              ))}

              {/* Office Hours */}
              <Paper sx={{ p: 3, backgroundColor: 'primary.light' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Office Hours
                </Typography>
                <Typography variant="body2">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </Typography>
                <Typography variant="body2">
                  Saturday: 10:00 AM - 4:00 PM
                </Typography>
                <Typography variant="body2">
                  Sunday: Closed
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Map Section (Placeholder) */}
        <Paper sx={{ mt: 4, p: 4, backgroundColor: 'grey.100', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Find Us Here
          </Typography>
          <Box
            sx={{
              height: 300,
              backgroundColor: 'grey.300',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Map Placeholder - Integration with Google Maps can be added here
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Contact;
