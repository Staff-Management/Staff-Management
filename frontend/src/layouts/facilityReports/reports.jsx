import * as React from 'react';
import { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export default function FacilityReports() {
  let email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com'
  const theme = createTheme();
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let str = `{"date":${month}, "month": ${date}, "year": ${year}}`
  let emailStr = `{"email": "${email}"}`
  let currentDate = JSON.parse(str)
  let currentEmail = JSON.parse(emailStr)
  const [values, setValues] = React.useState({
    title: "",
    description: ""

  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
      console.log(values)
  }, [values]);
  
  useEffect(() => {
    console.log(currentDate)
    console.log(emailStr)
  }, [ emailStr, currentDate]);

  const handleSubmit = async () => {
    const {title, description} = values;
    const { date, month, year } = currentDate;
    const { email } = currentEmail;
    try{
        const res = fetch('http://localhost:4000/facilityreport', {
            method: "POST",
            body: JSON.stringify({ title, description, email, date, month, year }),
            headers: {'Content-Type': 'application/json'}
        }); 
    }catch(e){
        console.log(e);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Add Facility Report
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Title "
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={10}
            fullWidth
            autoComplete="middle-name"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'Center' }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          style={{ width: 300, height: 50 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      </ThemeProvider>
      </DashboardLayout>
  );
}