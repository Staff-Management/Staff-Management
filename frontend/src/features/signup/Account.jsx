import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function Token() {
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
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}