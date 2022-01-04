import * as React from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import { Avatar, FormGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { styled, Theme, makeStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useCallback } from 'react';
import { useState } from 'react';
import axios from 'axios';

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

const SSN = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#00-00-0000"
      definitions={{
        "#": /[1-9]/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function PersonalForm() {
  const [values, setValues] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    gender: "",
    ssn: "",
    perm_citizen: null,
    greenCard: false,
    citizen: false,
    work_auth: "",
    cellPhone: "",
    Phone: "",
    workPhone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    vehicleMaker: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleColor: "",
  });

  const [contactList, setContactList] = React.useState([{
    contact: "",
  }])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(values);
  };

  const handleCheckbox = (event) => {
    console.log(event.target.checked);
    setValues({
      ...values,
      [event.target.name]: event.target.checked
    });
    console.log(values);
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

  const handleSubmission = (event) => {

  };

  const visa_status = (
    values.work_auth === 'other' ?
      <Grid item xs={12} sm={6}>
        <TextField
          id='outlined-basic'
          variant="standard"
          label="Specify Work Authorization"
          onChange={handleChange}
        />
        <TextField
          id='outlined-basic'
          variant="standard"
          label="Start Date"
          onChange={handleChange}
        />
        <TextField
          id='outlined-basic'
          variant="standard"
          label="Expiration Date"
          onChange={handleChange}
        />
      </Grid>
      :
      <></>
  )

  const Greencard_citizen = (
    values.perm_citizen === null ?
      <></>
      :
      (
        values.perm_citizen ?
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id='greenCard'
                      name='greenCard'
                      onChange={handleCheckbox}
                    />
                  }
                  label="Green Card"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id='citizen'
                      name='citizen'
                      onChange={handleCheckbox}
                    />
                  }
                  label="Citizen"
                />
              </FormGroup>
            </Grid>
          </React.Fragment>
          :
          <Grid item xs={12} sm={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="work_auth">Work Authorization</InputLabel>
              <Select
                labelId="work_auth"
                id="work_auth"
                name="work_auth"
                label="Work Authorization"
                value={values.work_auth}
                onChange={handleChange}
              >
                <MenuItem value={'h1b'}>H1-B</MenuItem>
                <MenuItem value={'l2'}>L2</MenuItem>
                <MenuItem value={'f1'}>F1(CPT/OPT)</MenuItem>
                <MenuItem value={'h4'}>H4</MenuItem>
                <MenuItem value={'other'}>Others</MenuItem>
              </Select>
            </FormControl>
            {visa_status}
          </Grid>
      )
  );

  const driver_license = (
    values.license === null ?
      <></>
      :
      (
        values.license ?
          <React.Fragment>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <TextField
                  id='outlined-basic'
                  variant="outlined"
                  label="Driver License Number"
                  onChange={handleCheckbox}
                />
                <TextField
                  id='outlined-basic'
                  variant="outlined"
                  label="Expiration Date"
                  onChange={handleCheckbox}
                />
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                </label>
                <Button onClick={handleSubmission} variant="contained" component="span">
                  Upload a license photo
                </Button>
              </FormGroup>
            </Grid>
          </React.Fragment>
          :
          <Grid item xs={12} sm={12}>
          </Grid>
      )
  );

  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom>
        Personal Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="middleName"
            name="middleName"
            label="Middle name"
            fullWidth
            autoComplete="middle-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="preferredName"
            name="preferredName"
            label="Preferred name"
            fullWidth
            autoComplete="preferred-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="birthday"
            name="birthday"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            fullWidth
            autoComplete="date-of-birth"
            type="date"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleChange}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="ssn" required>SSN</InputLabel>
            <Input
              value={values.ssn}
              onChange={handleChange}
              name="ssn"
              id="ssn"
              inputComponent={SSN}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} s={6}>
          <Typography variant="h6" gutterBottom>
            Profile Photo
          </Typography>
          <Avatar alt="" />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
          </label>
          <Button
            style={{ height: "25px" }}
            variant="contained"
            component="span"
            onClick={handleSubmission}
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you a citizen or permanent resident of the U.S?</FormLabel>
            <RadioGroup
              aria-label="perm_citizen"
              id='perm_citizen'
              name="perm_citizen"
              onChange={handleChange}
            >
              <FormControlLabel value='yes' control={<Radio />} label="Yes" />
              <FormControlLabel value='' control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {Greencard_citizen}

        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Do you have a driver license?</FormLabel>
            <RadioGroup
              aria-label="license"
              id='license'
              name="license"
              onChange={handleChange}
            >
              <FormControlLabel value='yes' control={<Radio />} label="Yes" />
              <FormControlLabel value='' control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {driver_license}

        <Grid item xs={12} sm={6}>

        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>
      </Grid>


      <Typography variant="h6" gutterBottom mt={'30px'}>
        Reference
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id="firstname"
            name="firstname"
            label="First Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id="middlename"
            name="middlename"
            label="Middle Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id="lastname"
            name="lastname"
            label="Last Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="Phone" required>Phone</InputLabel>
            <Input
              value={values.Phone}
              onChange={handleChange}
              name="Phone"
              id="Phone"
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
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={4}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
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
      </Grid>

      <formControl className="Contact" autoComplete="off">
        <div className='form-field'>
          <Typography id="emergency_contact" variant="h6" gutterBottom mt={'30px'}>
            Emergency Contact
          </Typography>
          {contactList.map((singleContact, index) => (
            <div key={index} className='contact'>
              <div className='first-contact'>
                <Grid item xs={12} lg={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    id="contact"
                    name="contact"
                    label="First Name"
                    variant="standard"
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    id="contact"
                    name="contact"
                    label="Middle Name"
                    variant="standard"
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    id="contact"
                    name="contact"
                    label="Last Name"
                    variant="standard"
                  />
                </Grid>
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="Phone" required>Phone</InputLabel>
                  <Input
                    value={values.Phone}
                    onChange={handleContactChange}
                    name="contact"
                    id="contact"
                    inputComponent={PhoneNumber}
                  />
                </FormControl>
                <TextField
                  required
                  id="contact"
                  name="contact"
                  label="Email"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  required
                  id="contact"
                  name="contact"
                  label="Relationship"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
                {contactList.length - 1 === index && contactList.length < 10 && (
                  <Button
                    color="primary"
                    onClick={handleContactAdd}
                    className='add-btn'
                  >
                    Add more emergency contact
                  </Button>
                )}
              </div>
              <div className='second-contact'>
                {contactList.length !== 1 && (
                  <Button
                    color="primary"
                    onClick={handleContactRemove}
                    className='remove-btn'
                  >
                    Remove emergency contact
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </formControl>

      <Typography variant="h6" gutterBottom mt={'30px'}>
        Contact Info
      </Typography>
      <Grid container spacing={3}>
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

      <Typography variant="h6" gutterBottom mt={'30px'}>
        Vehicle Info
      </Typography>
      <Grid container spacing={3}>
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
    </React.Fragment >
  );
}