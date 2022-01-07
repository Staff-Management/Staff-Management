import * as React from 'react';
import { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { selectEmail } from 'slices/userSlice';
import { useSelector } from 'react-redux';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { typography } from '@mui/system';

export default function PersonalForm() {
  const email = useSelector(selectEmail);
  const [values, setValues] = React.useState({
    optStem: null,
    optStatus: "",
    daysLeft: 90,
    approve: true,
  });
  const [isPending, setIsPending] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);
  const [optEad, setOptEad] = React.useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(values);
  };

  /* For Expire variable */
  const handlePending = (event) => {
    setIsPending(true);
  };
  /* For  newI20 variable */
  const handleCheck = () => {
    setIsCheck(true);
  }

  const handleOptEAD = () =>{
    setOptEad(true);
  }

  const download = () => {
    const link = document.createElement("a");
    link.download = `download.txt`;
    link.href = "";
    link.click();
  }

  const downloadInst = () => {
    const link = document.createElement("a");
    link.download = `download.txt`;
    link.href = "";
    link.click();
  }

  const expire = (
    values.daysLeft <= 90 ? 
      <React.Fragment>
        <Typography variant='6'>
          Please download and fill your I-983 form
        </Typography>
        {/* Flex not working */}
        <Box display="flex" justifyContent="space-between">
          <Button onClick={download} 
          variant="contained" 
          color="primary">
            Download I-983
          </Button>
          <Button onClick={downloadInst} 
          variant="contained" 
          color="primary">
            Instructions for I-983
          </Button>
        </Box>
        <Button
            type='submit'
            variant="contained"
            onClick={handlePending}
          >
            Upload completed I-983 Form
        </Button>
     </React.Fragment>
      : 
      <></>
  )

  const HR = (
    values.approve == true ?
    <React.Fragment>
      <Box>
        <Typography variant='6'>
        Please send the I-983 with all necessary 
        documents to your school and upload the new I-20
        </Typography>
        <Button
            type='submit'
            variant="contained"
            onClick={handleCheck}
        >
            Upload new I-20
        </Button>
      </Box>
    </React.Fragment>
    :
    <></>
  );

  const newI20 = (
    <React.Fragment>
      <Box>
        <Typography variant='6'>
          Please upload your OPT STEM Receipt
        </Typography>
        <Button
            type='submit'
            variant="contained"
            onClick={handleOptEAD}
        >
            Upload OPT Receipt
        </Button>
      </Box>
    </React.Fragment>
  );

  const optEadCard = (
    <React.Fragment>
      <Box>
        <Typography variant='6'>
          Please upload your OPT STEM EAD
        </Typography>
        <Button
            type='submit'
            variant="contained"
            onClick={handleOptEAD}
        >
            Upload STEM OPT EAD
        </Button>
      </Box>
    </React.Fragment>
  )

  const opt_status = (
    values.optStatus !== '' ?
      <></>
      :
      (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <Typography variant="6">
              Please upload a copy of your OPT EAD CARD
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            accept="image/*"
            id="dl_img"
            name="dl_img"
            type="file"
            fullWidth
          />
          <Button
            type='submit'
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Upload
          </Button>
        </Box>
        </Grid>
        { expire }
        {!isPending ? 
         <></>
         :
        <Typography variant="5">
          Waiting for HR to approve and sign I-983
        </Typography>
        }
      </React.Fragment>
    )
  )

  const stem_opt = (
    values.optStem === null ?
      <></>
      :
      (
        values.optStem ?
            <React.Fragment>
            <Grid item xs={12} sm={6}>
              <Typography variant="6">
                  Please upload a copy of your OPT STEM EAD CARD
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Box component="form"  noValidate sx={{ mt: 1 }}>
              <TextField
                accept="image/*"
                id="dl_img"
                name="dl_img"
                type="file"
                fullWidth
              />
              <Button
                type='submit'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Upload
              </Button>
            </Box>
            </Grid>
          </React.Fragment>
          :
          <React.Fragment>
            <Grid item xs={12} sm={12}>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={3}>
                { opt_status }
                { HR }
                {isCheck && newI20}
                {optEad && optEadCard}
              </Grid>
            </Grid>
          </React.Fragment>
      )
  );

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Status Notification
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Do you have a STEM OPT?</FormLabel>
            <RadioGroup
              aria-label="optStem"
              id='optStem'
              name="optStem"
              onChange={handleChange}
            >
              <FormControlLabel value='yes' control={<Radio />} label="Yes" />
              <FormControlLabel value='' control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {stem_opt}
      </Grid>
    </DashboardLayout >
  );
}