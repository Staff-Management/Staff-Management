import * as React from 'react';
import { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { selectEmail, setDocuments, selectDocuments } from 'slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function Documents() {
  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const document_info = useSelector(selectDocuments);
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    work_auth_info: {
      opt_type: ""
    }
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
      setFileSrc('workAuth');
    } catch (err) {
      console.log(err)
    }
  }

  const handleFileChange = (event) => {
    setValues({
      ...values,
      [`${event.target.name}_file`]: event.target.files[0],
      [`${event.target.name}_filename`]: event.target.files[0].name
    });
  };

  const handleFileUpload = async (event, field_name) => {
    event.preventDefault();
    try {
      const file = values[`${field_name}_file`];
      const data = new FormData();
      data.append('email', email);
      data.append('field_name', field_name);
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
      })
    } catch (err) {
      console.log(err)
    }
  };

  const display_opt_receipt = (
    values.work_auth_info.opt_type === 'opt' ?
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
          OPT Receipt
        </Typography>
        <Box sx={{ p: 2, m: 2, border: '1px dashed grey' }}>
          <Link href={values.workAuth_src} download={values.workAuth_filename} underline="hover" >
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              {values.workAuth_filename}
              <FileDownloadIcon color='primary' />
            </Typography>
          </Link>
        </Box>
      </Grid>
      :
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
          OPT STEM Receipt
        </Typography>
        <Box sx={{ p: 2, m: 2, border: '1px dashed grey' }}>
          <Link href={values.workAuth_src} download={values.workAuth_filename} underline="hover" >
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              {values.workAuth_filename}
              <FileDownloadIcon color='primary' />
            </Typography>
          </Link>
        </Box>
      </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        {display_opt_receipt}
        {/* <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Upload a copy of your Driver License</FormLabel>
            <Box sx={{ p: 2, m: 2, border: '1px dashed grey' }}>
              {values.workAuth_src === "" ?
                <Typography>
                  No file uploaded
                </Typography>
                :
                <Link href={values.workAuth_src} download={values.workAuth_filename} underline="hover" >
                  <Typography sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    {values.workAuth_filename}
                    <FileDownloadIcon color='primary' />
                  </Typography>
                </Link>
              }
            </Box>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box component="form" onSubmit={(event) => handleFileUpload(event, 'workAuth')} noValidate sx={{ mt: 1 }}>
                  <Input
                    inputProps={{ accept: 'image/*, application/pdf' }}
                    id="workAuth"
                    name="workAuth"
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
              </Grid>
            </Grid>
          </FormControl>
        </Grid> */}
      </Grid>
    </DashboardLayout>
  );
}