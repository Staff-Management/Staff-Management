import * as React from 'react';
import { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { IMaskInput } from 'react-imask';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setContactInfo } from 'slices/userSlice';

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
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    cell_phone: "",
    work_phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    vehicle_maker: "",
    vehicle_model: "",
    vehicle_color: ""
  });

  const [contactList, setContactList] = React.useState([{}])

  useEffect(() => {
    dispatch(setContactInfo({val: {...values}, list: [...contactList]}))
  })

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
    setContactList([...contactList, {}]);
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
            <InputLabel htmlFor="cell_phone" required>Cell Phone</InputLabel>
            <Input
              value={values.cell_phone}
              onChange={handleChange}
              name="cell_phone"
              id="cell_phone"
              inputComponent={PhoneNumber}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="work_phone">Work Phone</InputLabel>
            <Input
              value={values.work_phone}
              onChange={handleChange}
              name="work_phone"
              id="work_phone"
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
                        onChange={(event) => handleContactChange(event, index)}
                        fullWidth
                        id="em_firstname"
                        name="em_firstname"
                        label="First Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        onChange={(event) => handleContactChange(event, index)}
                        fullWidth
                        id="em_middlename"
                        name="em_middlename"
                        label="Middle Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        onChange={(event) => handleContactChange(event, index)}
                        fullWidth
                        id="em_lastname"
                        name="em_lastname"
                        label="Last Name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="Phone" required>Phone</InputLabel>
                        <Input
                          value={contactList[index].em_phone}
                          onChange={(event) => handleContactChange(event, index)}
                          name="em_phone"
                          id="em_phone"
                          inputComponent={PhoneNumber}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        onChange={(event) => handleContactChange(event, index)}
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
                        onChange={(event) => handleContactChange(event, index)}
                        id="relationship"
                        name="relationship"
                        label="Relationship"
                        fullWidth
                        variant="standard"
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
            id="vehicle_maker"
            name="vehicle_maker"
            label="Vehicle Maker"
            fullWidth
            autoComplete="vehicle-maker"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vehicle_model"
            name="vehicle_model"
            label="Vehicle Model"
            fullWidth
            autoComplete="vehicle-model"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vehicle_color"
            name="vehicle_color"
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