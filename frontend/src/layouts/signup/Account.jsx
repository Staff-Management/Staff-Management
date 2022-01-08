import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { setUsername, setPassword, setRePassword, selectUsername } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Token() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            value={username}
            onChange={(event) => dispatch(setUsername({ username: event.target.value }))}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            autoComplete='password'
            type='password'
            onChange={(event) => dispatch(setPassword({ password: event.target.value }))}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="re-password"
            name="re-password"
            label="Re-enter Password"
            type='password'
            onChange={(event) => dispatch(setRePassword({ repassword: event.target.value }))}
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}