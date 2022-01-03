import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Token from './TokenForm';
import Account from './Account';
import { selectEmail, selectToken, selectUsername, setEmail, selectPassword, selectRePassword, setToken } from '../../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const steps = ['Token', 'Account'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Token />;
    case 1:
      return <Account />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Onboarding() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  if (searchParams.get("token") !== null)
  {
    dispatch(setToken({ token: searchParams.get("token") }))
  }
  const reg_token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const repassword = useSelector(selectRePassword);
  const email = useSelector(selectEmail);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleNext = async () => {
    if (activeStep === 0)
    {
      try
      {
        const res = await fetch('http://localhost:4000/check', {
          method: 'POST',
          body: JSON.stringify({ reg_token }),
          headers: {'Content-Type': 'application/json'}
        })
        const response = await res.json();
        console.log(response);
        dispatch(setEmail({ email: response.email }))
        setActiveStep(activeStep + 1);
      }
      catch(err)
      {
        alert('Invalid Token');
        console.log(err);
      }
    }
    else if (activeStep === 1)
    {
      // Should check username duplicate here
      if (password !== repassword)
      {
        alert("Passwords are not the same")
      }
      else
      {
        try
        {
          const res = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: {'Content-Type': 'application/json'}
          })
          const response = await res.json();
          setActiveStep(activeStep + 1);
        }
        catch(err)
        {
          alert('Invalid Account');
          console.log(err);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Sign Up Successfully!
                </Typography>
                <div style={{color: 'transparent'}}>
                  { 
                    setTimeout(() => { navigate('/onboarding')}, 3000)
                  }
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}