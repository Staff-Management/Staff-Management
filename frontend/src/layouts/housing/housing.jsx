import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const PhoneNumber = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(000) 000-0000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const zipCode = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const num = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function PersonalForm(props) {
  const theme = createTheme();
  const [values, setValues] = React.useState({
   landLordPhone: "",
   landLord: "",
   zip: "",
   numBeds: "",
   numMattress: "",
   numTables: "",
  });
  const [tenantsList, setTenantsList] = React.useState([{}])

  useEffect(() =>{
    console.log(values)
  }, [values])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleContactChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tenantsList];
    list[index][name] = value;
    setTenantsList(list);
    console.log(list);
  };

  const handleContactRemove = (index) => {
    const list = [...tenantsList];
    list.splice(index, 1);
    setTenantsList(list);
  };

  const handleContactAdd = () => {
    setTenantsList([...tenantsList, {}]);
  };

  const handleConfirm = async () => {
    const { landLord, landlordEmail, landLordPhone, address1, address2, city, 
      numEmployees, state, zip, numBeds,numMattress, numTables } = values 
    const { preferredName, firstName, tenantsPhone } = tenantsList[0];
    console.log(preferredName, firstName, tenantsPhone);
    console.log(tenantsList);
    try {
      const res = await fetch('http://localhost:4000/addhouse', {
        method: 'POST',
        body: JSON.stringify({ landLord, landlordEmail, landLordPhone, address1, address2, city, 
          numEmployees, state, zip, numBeds,numMattress, numTables, tenantsList }),
        headers: {'Content-Type': 'application/json'}
      })
      const response = await res.json();
    }
    catch(err)
    {
      alert('Error');
      console.log(err);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Landlord Information
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="landLord"
            name="landLord"
            label="Lordlord Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lanlordEmail"
            name="lanlordEmail"
            label="Landlord Email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="landLordPhone" required>Phone</InputLabel>
            <Input
              value={values.landLordPhone}
              onChange={handleChange}
              name="landLordPhone"
              id="landLordPhone"
              inputComponent={PhoneNumber}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address1"
            name="address1"
            label="Address1"
            fullWidth
            autoComplete="address1"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address2"
            name="address2"
            label="address 2"
            fullWidth
            autoComplete="address-2"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State"
            fullWidth
            autoComplete="state"
            variant="standard"

            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="zip" required>Zip Code</InputLabel>
            <Input
              value={values.zip}
              onChange={handleChange}
              name="zip"
              id="zip"
              inputComponent={zipCode}
            />
          </FormControl>
        </Grid>
    </Grid>
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Facility Information
      </Typography>
      <Grid container spacing={3} mb={3}>
      <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="zip_code" required>Number of beds</InputLabel>
            <Input
              value={values.numBeds}
              onChange={handleChange}
              name="numBeds"
              id="numBeds"
              inputComponent={num}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="zip_code" required>Number of Mattress</InputLabel>
            <Input
              value={values.numMattress}
              onChange={handleChange}
              name="numMattress"
              id="numMattress"
              inputComponent={num}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="zip_code" required>Number of Tables</InputLabel>
            <Input
              value={values.numTables}
              onChange={handleChange}
              name="numTables"
              id="numTables"
              inputComponent={num}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Add Tenants 
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={12}>
          <FormControl className="Contact" autoComplete="off">
            {tenantsList.map((singleContact, index) => (
              <div key={index} className='contact'>
                <div className='first-contact'>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        onChange={(event) => handleContactChange(event, index)}
                        id="firstName"
                        name="firstName"
                        label="Tenant's First Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        onChange={(event) => handleContactChange(event, index)}
                        id="preferredName"
                        name="preferredName"
                        label="Tenant'sPreferred Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="tenantsPhone" required>Tenant's Phone</InputLabel>
                        <Input
                          value={tenantsList[index].tenantsPhone}
                          onChange={(event) => handleContactChange(event, index)}
                          name="tenantsPhone"
                          id="tenantsPhone"
                          inputComponent={PhoneNumber}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      {tenantsList.length - 1 === index && tenantsList.length < 10 && (
                        <Button
                          color="primary"
                          onClick={handleContactAdd}
                          sx={{ mb: 3, textAlign: 'left' }}
                          variant="contained"
                          fullWidth
                        >
                          Add
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </div>
                <div className='second-contact'>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      {tenantsList.length !== 1 && (
                        <Button
                          color="secondary"
                          onClick={handleContactRemove}
                          variant="contained"
                          fullWidth
                        >
                          Remove
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </div>
            ))}
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="contained" 
          sx={{ mt: 3, ml: 1 }}
          onClick={handleConfirm}
        >
          Submit
        </Button>
      </Box>
      </ThemeProvider>
      </DashboardLayout>
  );
}