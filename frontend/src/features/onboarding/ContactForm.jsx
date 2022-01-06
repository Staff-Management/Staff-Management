import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';
import Button from '@mui/material/Button';

const PhoneNumber = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function ContactForm() {
  const [values, setValues] = React.useState({
    cellphone: "",
    workphone: ""
  });

  const [contactList, setContactList] = React.useState([{
    contact: "",
  }])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleContactChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...contactList];
    list[index][name] = value;
    setContactList(list);
  };

  const handleContactRemove = (index) => {
    const list = [...contactList];
    list.splice(index, 1);
    setContactList(list);
  };

  const handleContactAdd = () => {
    setContactList([...contactList, { contact: "" }]);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Contact Info
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            InputLabelProps={{ shrink: true }}
            value={'disabled@email.com'}
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="cellPhone" required>Cell Phone</InputLabel>
            <Input
              value={values.cellPhone}
              onChange={handleChange}
              name="cellPhone"
              id="cellPhone"
              inputComponent={PhoneNumber}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="workPhone">Work Phone</InputLabel>
            <Input
              value={values.workPhone}
              onChange={handleChange}
              name="workPhone"
              id="workPhone"
              inputComponent={PhoneNumber}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
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
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Emergency Contact
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={12}>
          <FormControl className="Contact" autoComplete="off">
            {contactList.map((singleContact, index) => (
              <div key={index} className='contact'>
                <div className='first-contact'>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="em_first_name"
                        name="em_first_name"
                        label="First Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="em_middle_name"
                        name="em_middle_name"
                        label="Middle Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="em_last_name"
                        name="em_last_name"
                        label="Last Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="Phone" required>Phone</InputLabel>
                        <Input
                          value={values.Phone}
                          onChange={handleContactChange}
                          name="em_phone"
                          id="em_phone"
                          inputComponent={PhoneNumber}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="em_email"
                        name="em_email"
                        label="Email"
                        fullWidth
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="relationship"
                        name="relationship"
                        label="Relationship"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {contactList.length - 1 === index && contactList.length < 10 && (
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
                    <Grid item xs={12} sm={6}>
                      {contactList.length !== 1 && (
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

      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Vehicle Info
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vehicleMaker"
            name="vehicleMaker"
            label="Vehicle Maker"
            fullWidth
            autoComplete="vehicle-maker"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vehicleModel"
            name="vehicleModel"
            label="Vehicle Model"
            fullWidth
            autoComplete="vehicle-model"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vehicleType"
            name="vehicleType"
            label="Vehicle Type"
            fullWidth
            autoComplete="vehicle-type"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vehicleColor"
            name="vehicleColor"
            label="Vehicle Color"
            fullWidth
            autoComplete="vehicle-color"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}