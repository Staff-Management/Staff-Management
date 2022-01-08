import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, selectToken } from '../../slices/userSlice';

export default function TokenForm() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Registration Token
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="token"
            name="token"
            label="Registration Token"
            value={token}
            fullWidth
            onChange={(event) => dispatch(setToken({ token: event.target.value }))}
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}