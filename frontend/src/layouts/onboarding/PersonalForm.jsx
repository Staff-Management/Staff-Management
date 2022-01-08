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
import { selectEmail, setPersonalInfo, selectPersonalInfo } from 'slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';

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

const SSN = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000-00-0000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function PersonalForm(props) {
  const email = useSelector(selectEmail);
  const personal_info = useSelector(selectPersonalInfo);
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    gender: "",
    ssn: personal_info.ssn,
    avatar_file: null,
    avatar_data: "",
    avatar_src: "",
    driverLicense: "",
    driverlicense_own: null,
    driverLicense_num: "",
    driverLicense_exp: "",
    driverLicense_file: "",
    driverLicense_data: "",
    perm_citizen: "",
    green_card_citizen: "",
    work_auth: "",
    other_work_auth: "",
    workAuth: "",
    workAuth_start: "",
    workAuth_exp: "",
    workAuth_file: null,
    workAuth_data: "",
    ref_firstname: "",
    ref_middlename: "",
    ref_lastname: "",
    ref_phone: personal_info.ref_phone,
    ref_email: "",
    ref_address1: "",
    ref_city: "",
    ref_state: "",
    ref_zip: "",
    ref_country: "",
    relationship: ""
  });

  useEffect(() => {
    if (values['avatar_data'].includes('data:image'))
      uploadFile('avatar');
  }, [values['avatar_data']])

  useEffect(() => {
    if (values['driverLicense_data'] && values['driverLicense_file'])
      uploadFile('driverLicense');
  }, [values['driverLicense_data']])

  useEffect(() => {
    if (values['workAuth_data'] && values['workAuth_file'])
      uploadFile('workAuth');
  }, [values['workAuth_data']])

  useEffect(() => {
    setValues(personal_info);
  }, []);

  const handleSave = () => {
    dispatch(setPersonalInfo({...values, avatar_file: "", driverLicense_file: "", workAuth_file: ""}));
    props.handleNext();
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
      [`${event.target.name}_file`]: event.target.files[0]
    });
  };

  const handleFile = async (event, field_name) => {
    event.preventDefault();
    if (values[`${field_name}_file`])
    {
      let reader = new FileReader()
      reader.onload = (e) => {
        setValues({
          ...values,
          [`${field_name}_data`]: e.target.result
        });
      }
      reader.readAsDataURL(values[`${field_name}_file`]);
    }
  };

  const uploadFile = async (field_name) => {
    const file_data = values[`${field_name}_data`];
    const extension = values[`${field_name}_file`].name.split('.').pop();
    try {
      const res = await fetch('http://localhost:4000/uploadfile', {
        method: 'POST',
        body: JSON.stringify({ email, file_data, extension, field_name }),
        headers: {'Content-Type': 'application/json'}
      })
      const response = await res.json();
      setValues({
        ...values,
        [field_name]: response.path
      });
      if (field_name === 'avatar')
      {
        showAvatar();
      }
    } catch(err){
      console.log(err)
    }
  };

  const showAvatar = async () => {
    try {
      const res = await fetch('http://localhost:4000/getavatar', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {'Content-Type': 'application/json'}
      })
      const response = await res.json();
      setValues({
        ...values,
        avatar_src: `data:${values.avatar_file.type};base64,${response.src}`
      });
    } catch(err){
      console.log(err)
    }
  };

  const displayAvatar = (
    values.avatar_src === "" ?
    <></>
    :
    <div>
      <img src={values.avatar_src} style={{borderRadius:'50%', objwectFit: 'cover', width: 100, height: 100}}></img>
    </div>
  )

  const visa_status = (
    values.workAuth === '' ?
      <></>
      :
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <TextField
            id="workAuth_start"
            name="workAuth_start"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            variant="standard"
            defaultValue={personal_info.workAuth_start}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="workAuth_exp"
            name="workAuth_exp"
            label="Expiration Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            variant="standard"
            defaultValue={personal_info.workAuth_exp}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box component="form" onSubmit={(event) => handleFile(event, 'workAuth')} noValidate sx={{ mt: 1 }}>
            <TextField
              accept="image/*, application/pdf"
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
      </React.Fragment>
  )

  const other_work_auth = (
    values.workAuth === 'other' ?
      <Grid item xs={12} sm={12}>
        <TextField
          id='other_work_auth'
          name='other_work_auth'
          variant="standard"
          label="Specify Work Authorization"
          fullWidth
          defaultValue={personal_info.other_work_auth}
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
        values.perm_citizen === "yes" ?
          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Please specify:</FormLabel>  
              <RadioGroup
                aria-label="green_card_citizen"
                id='green_card_citizen'
                name="green_card_citizen"
                row
                defaultValue={personal_info.green_card_citizen}
                onChange={handleChange}
              >
                <Grid item xs={12} sm={6}>
                  <FormControlLabel value='green_card' control={<Radio />} label="Green Card" />
                </Grid>
                <Grid item xs={12} sm={6}>
                < FormControlLabel value='citizen' control={<Radio />} label="Citizen" />
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          :
          <React.Fragment>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="workAuth">Work Authorization</InputLabel>
                <Select
                  labelId="work_auth"
                  id="work_auth"
                  name="work_auth"
                  label="Work Authorization"
                  defaultValue={personal_info.work_auth}
                  onChange={handleChange}
                >
                  <MenuItem value={'h1b'}>H1-B</MenuItem>
                  <MenuItem value={'l2'}>L2</MenuItem>
                  <MenuItem value={'f1'}>F1(CPT/OPT)</MenuItem>
                  <MenuItem value={'h4'}>H4</MenuItem>
                  <MenuItem value={'other'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={3}>
                { other_work_auth }
                { visa_status }
              </Grid>
            </Grid>
          </React.Fragment>
      )
  );

  const driver_license = (
    values.driverLicense_own === null ?
      <></>
      :
      (
        values.driverLicense_own === "yes" ?
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='driverLicense_num'
                name='driverLicense_num'
                variant="standard"
                label="Driver License Number"
                defaultValue={personal_info.driverLicense_num}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="driverLicense_exp"
                name="driverLicense_exp"
                label="Expiration Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                variant="standard"
                defaultValue={personal_info.driverLicense_exp}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box component="form" onSubmit={(event) => handleFile(event, 'driverLicense')} noValidate sx={{ mt: 1 }}>
                <TextField
                  accept="image/*, application/pdf"
                  id="driverLicense"
                  name="driverLicense"
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
          :
          <></>
      )
  );

  return (
    <React.Fragment >
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Personal Info
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={personal_info.firstName}
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
            defaultValue={personal_info.middleName}
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
            defaultValue={personal_info.lastName}
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
            defaultValue={personal_info.preferredName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="birthday"
            name="birthday"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            fullWidth
            autoComplete="date-of-birth"
            type="date"
            variant="standard"
            defaultValue={personal_info.birthday}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" required fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              name="gender"
              label="Gender"
              defaultValue={personal_info.gender}
              onChange={handleChange}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" required fullWidth>
            <InputLabel htmlFor="ssn">SSN</InputLabel>
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
          <Box component="form" onSubmit={(event) => handleFile(event, 'avatar')} noValidate sx={{ mt: 1 }}>
            <TextField
              accept="image/*"
              id="avatar"
              name="avatar"
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
          { displayAvatar }
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Do you have a driver license?</FormLabel>
            <RadioGroup
              aria-label="driverLicense_own"
              id="driverLicense_own"
              name="driverLicense_own"
              defaultValue={personal_info.driverLicense_own}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {driver_license}
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Work Authorization
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you a citizen or permanent resident of the U.S?</FormLabel>
            <RadioGroup
              aria-label="perm_citizen"
              id='perm_citizen'
              name="perm_citizen"
              defaultValue={personal_info.perm_citizen}
              onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {Greencard_citizen}
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Reference
      </Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            defaultValue={personal_info.ref_firstname}
            onChange={handleChange}
            id="ref_firstname"
            name="ref_firstname"
            label="First Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            defaultValue={personal_info.ref_middlename}
            onChange={handleChange}
            id="ref_middlename"
            name="ref_middlename"
            label="Middle Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            defaultValue={personal_info.ref_lastname}
            onChange={handleChange}
            id="ref_lastname"
            name="ref_lastname"
            label="Last Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="ref_phone" required>Phone</InputLabel>
            <Input
              value={values.ref_phone}
              onChange={handleChange}
              name="ref_phone"
              id="ref_phone"
              inputComponent={PhoneNumber}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            defaultValue={personal_info.ref_email}
            onChange={handleChange}
            id="ref_email"
            name="ref_email"
            label="Email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            defaultValue={personal_info.ref_address1}
            id="ref_address1"
            name="ref_address1"
            label="Address line 1"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            defaultValue={personal_info.ref_city}
            id="ref_city"
            name="ref_city"
            label="City"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="ref_state"
            name="ref_state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            defaultValue={personal_info.ref_state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ref_zip"
            name="ref_zip"
            label="Zip / Postal code"
            fullWidth
            variant="standard"
            defaultValue={personal_info.ref_zip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ref_country"
            name="ref_country"
            label="Country"
            fullWidth
            variant="standard"
            defaultValue={personal_info.ref_country}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="ref_relationship"
            name="ref_relationship"
            label="Relationship"
            fullWidth
            variant="standard"
            defaultValue={personal_info.ref_relationship}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ mt: 3, ml: 1 }}
        >
          Next
        </Button>
      </Box>
    </React.Fragment >
  );
}