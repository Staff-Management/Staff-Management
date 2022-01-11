import * as React from 'react';
import { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { selectEmail } from 'slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function Documents() {
  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const theme = createTheme();
  const [values, setValues] = React.useState({
    opt_type: ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/getuser', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setValues(response.user);
      if (response.user.opt_receipt)
        setFileSrc('opt_receipt');
      if (response.user.opt_stem_receipt)
        setFileSrc('opt_stem_receipt');
      if (response.user.opt_ead)
        setFileSrc('opt_ead');
      if (response.user.opt_stem_ead)
        setFileSrc('opt_stem_ead');
      if (response.user.i983)
        setFileSrc('i983');
      if (response.user.i20)
        setFileSrc('i20');
    } catch (err) {
      console.log(err)
    }
  }

  const handleRefresh = () => {
    fetchUser();
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleFileChange = (event) => {
    setValues({
      ...values,
      [`${event.target.name}_file`]: event.target.files[0],
      [`${event.target.name}_filename`]: event.target.files[0].name,
      [`${event.target.name}_src`]: ""
    });
  };

  const handleFileUpload = async (event, field_name) => {
    event.preventDefault();
    try {
      const file = values[`${field_name}_file`];
      const data = new FormData();
      data.append('email', email);
      data.append('field_name', field_name);
      if (field_name === "opt_ead" || field_name === 'opt_stem_ead') {
        data.append('start', values[`${field_name}_start`]);
        data.append('exp', values[`${field_name}_exp`]);
      }
      data.append('file', file, file.name);
      const res = await fetch('http://localhost:4000/uploadfile', {
        method: 'POST',
        body: data,
      })
      const response = await res.json();
      setValues({
        ...values,
        [field_name]: response.path
      });
      setFileSrc(field_name);
    } catch (err) {
      console.log(err)
    }
  };

  const setFileSrc = async (field_name) => {
    try {
      const res = await fetch('http://localhost:4000/getfile', {
        method: 'POST',
        body: JSON.stringify({ email, field_name }),
        headers: { 'Content-Type': 'application/json' }
      });
      const response = await res.json();
      setValues(prevState => {
        return {
          ...prevState,
          [`${field_name}_src`]: response.data
        }
      });
    } catch (err) {
      console.log(err)
    }
  };

  const file_upload = (field_name, time_required = false) => {
    return (
      <Grid item xs={12} sm={12}>
        {time_required ?
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id={`${field_name}_start`}
                name={`${field_name}_start`}
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                variant="standard"
                defaultValue={values[`${field_name}_start`]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id={`${field_name}_exp`}
                name={`${field_name}_exp`}
                label="Expiration Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                variant="standard"
                defaultValue={values[`${field_name}_exp`]}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          :
          <></>
        }
        <FormControl component="fieldset">
          <FormLabel component="legend">Upload a copy of your {field_name.replaceAll("_", " ").toUpperCase()}</FormLabel>
          <Box sx={{ p: 2, m: 2, border: '1px dashed grey' }}>
            {values[`${field_name}_src`] ?
              <Link href={values[`${field_name}_src`]} download={values[`${field_name}_filename`]} underline="hover" >
                <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  {values[`${field_name}_filename`]}
                  <FileDownloadIcon color='primary' />
                </Typography>
              </Link>
              :
              <Typography>
                No file uploaded
              </Typography>
            }
          </Box>
          <Box component="form" onSubmit={(event) => handleFileUpload(event, field_name)} noValidate sx={{ mt: 1 }}>
            <Input
              inputProps={{ accept: 'image/*, application/pdf' }}
              id={field_name}
              name={field_name}
              type="file"
              onChange={handleFileChange}
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
        </FormControl>
      </Grid>
    );
  }

  const i983_upload = () => {
    if (values.opt_ead_src && values.opt_ead_exp) {
      const start = Date.now();
      const exp = new Date(values.opt_ead_exp);
      const diff = Math.floor((exp - start) / (1000 * 3600 * 24));
      if (diff <= 100) {
        return (
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
              I-983
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Your OPT EAD Expires in {diff} days, please download and fill your
                < Link href="https://www.ice.gov/doclib/sevis/pdf/i983.pdf" target="_blank">
                  <Typography sx={{ display: 'inline-flex', alignItems: 'center', ml: 1, mr: 1 }}>
                    {'I-983'}
                    <FileDownloadIcon color='primary' />
                  </Typography>
                </Link>
                form
              </FormLabel>
              <Box sx={{ p: 2, m: 2, border: '1px dashed grey' }}>
                {values.i983_src ?
                  <Link href={values.i983_src} download={values.i983_filename} underline="hover" >
                    <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      {values.i983_filename}
                      <FileDownloadIcon color='primary' />
                    </Typography>
                  </Link>
                  :
                  <Typography>
                    No file uploaded
                  </Typography>
                }
              </Box>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Box component="form" onSubmit={(event) => handleFileUpload(event, 'i983')} noValidate sx={{ mt: 1 }}>
                    <Input
                      inputProps={{ accept: 'image/*, application/pdf' }}
                      id="i983"
                      name="i983"
                      type="file"
                      onChange={handleFileChange}
                      fullWidth
                    />
                    <Button
                      type='submit'
                      variant="contained"
                      sx={{ mt: 3, mb: 2, mr: 3 }}
                    >
                      Upload
                    </Button>
                    <Tooltip title={'refresh'} placement="top">
                      <IconButton aria-label="refresh" color="info" onClick={handleRefresh}>
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </FormControl>
            <Typography>
              {values.i983_src ?
                (values.i983_approved ?
                  <React.Fragment>
                    Status: Approved<br />
                    Please send the I-983 with all necessary documents to your school and upload the new I-20
                  </React.Fragment>
                  :
                  'Status: Pending Review'
                )
                :
                'Status: No Submission'
              }
            </Typography>
          </Grid >
        )
      }
    }
    else {
      return <></>
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
              OPT Receipt
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Please specify you OPT type:</FormLabel>
              <RadioGroup
                aria-label="opt_type"
                id='opt_type'
                name="opt_type"
                row
                onChange={handleChange}
              >
                <Grid item xs={12} sm={6}>
                  <FormControlLabel value='opt' control={<Radio />} label="OPT" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  < FormControlLabel value='opt_stem' control={<Radio />} label="OPT STEM" />
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>

          {values.opt_type ?
            (
              values.opt_type === "opt" ?
                <React.Fragment>
                  {file_upload('opt_receipt')}
                  {values.opt_receipt_src ?
                    <React.Fragment>
                      <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                          OPT EAD
                        </Typography>
                      </Grid>
                      {file_upload('opt_ead', true)}
                      {i983_upload()}
                      {values.i983_approved ?
                        <React.Fragment>
                          <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                              I-20
                            </Typography>
                          </Grid>
                          {file_upload('i20')}
                          {values.i20_src ?
                            <React.Fragment>
                              <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                                  OPT STEM RECEIPT
                                </Typography>
                              </Grid>
                              {file_upload('opt_stem_receipt')}
                              {values.opt_stem_receipt_src ?
                                <React.Fragment>
                                  <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                                      OPT STEM EAD
                                    </Typography>
                                  </Grid>
                                  {file_upload('opt_stem_ead', true)}
                                </React.Fragment>
                                :
                                <></>
                              }
                            </React.Fragment>
                            :
                            <></>
                          }
                        </React.Fragment>
                        :
                        <></>
                      }
                    </React.Fragment>
                    :
                    <></>
                  }
                </React.Fragment>
                :
                <React.Fragment>
                  {file_upload('opt_stem_receipt')}
                  {values.opt_stem_receipt_src ?
                    <React.Fragment>
                      <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                          OPT STEM EAD
                        </Typography>
                      </Grid>
                      {file_upload('opt_stem_ead', true)}
                    </React.Fragment>
                    :
                    <></>
                  }
                </React.Fragment>
            )
            :
            <></>
          }
        </Grid>
      </ThemeProvider>
    </DashboardLayout >
  );
}