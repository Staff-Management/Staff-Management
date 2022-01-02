import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();
  const [values, setValues] = React.useState({
    account: "",
    password: "",
    remember: false
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(values);
  };

  const handleCheckbox = (event) => {
    console.log(event.target.checked);
    setValues({
      ...values,
      [event.target.name]: event.target.checked
    });
    console.log(values);
  }
  return (
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={(event) => handleLogin(event, values, dispatch, navigate)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Username or Email"
              name="account"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="remember"
                  name='remember'
                  color="primary"
                  onChange={handleCheckbox}/>
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

async function handleLogin(event, values, dispatch, navigate){
  // Should fetech user account here
  event.preventDefault();
  const account = values.account;
  const password = values.password;

  try {
    const res = await fetch('http://localhost:4000/login', {
     method: 'POST',
     body: JSON.stringify({ account, password }),
     headers: {'Content-Type': 'application/json'}
    })

    const response = await res.json();
    if (response.user){
      localStorage.setItem('user', JSON.stringify(response.user));
      dispatch(setLogin());
      navigate('/');
    }
  } catch(err){
      console.log(err)
  }
}

export default Login;