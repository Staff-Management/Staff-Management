import React from 'react';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Token() {
  const navigate = useNavigate();
  const theme = createTheme();
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Token Generation
            </Typography>
            <Box component="form" onSubmit={(event) => handleGenerate(event, values, navigate)} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                onChange={handleChange}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Generate Token and Send Email
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </DashboardLayout>
  );
}

async function handleGenerate(event, values, navigate) {
  event.preventDefault();
  const email = values.email;
  try {
    const res = await fetch('http://localhost:4000/token', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    })
    const response = await res.json();
    console.log(response);
    navigate('/');
  } catch (err) {
    console.log(err)
  }
}

export default Token;