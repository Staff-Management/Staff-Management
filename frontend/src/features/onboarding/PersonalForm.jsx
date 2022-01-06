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
import { Avatar, FormGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { selectEmail } from 'slices/userSlice';
import { useSelector } from 'react-redux';

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
  const email = useSelector(selectEmail);
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
    avatar_file: null,
    avatar_image: "",
    avatar_src: "",
    refer_phone: ""
  });

  useEffect(() => {
    if (values.avatar_image.includes('data:image/jpeg'))
    {
      uploadImage();
    }
  }, [values.avatar_image])

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

  const handleAvatarChange = (event) => {
    setValues({
      ...values,
      avatar_file: event.target.files[0]
    });
  };

  const uploadImage = async () => {
    const image_data = values.avatar_image;
    try {
      const res = await fetch('http://localhost:4000/setavatar', {
        method: 'POST',
        body: JSON.stringify({ email, image_data }),
        headers: {'Content-Type': 'application/json'}
      })
      const response = await res.json();
      showAvatar();
    } catch(err){
      console.log(err)
    }
  };

  const handleAvatar = async (event) => {
    event.preventDefault();
    let reader = new FileReader()
    reader.onload = (e) => {
      setValues({
        ...values,
        avatar_image: e.target.result
      });
    }
    reader.readAsDataURL(values.avatar_file);
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
        avatar_src: `data:image/jpeg;base64,${response.src}`
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
    values.work_auth === '' ?
      <></>
      :
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <TextField
            id="visa_start"
            name="visa_start"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="visa_exp"
            name="visa_exp"
            label="Expiration Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            type="date"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
      </React.Fragment>
  )

  const other_work_auth = (
    values.work_auth === 'other' ?
      <Grid item xs={12} sm={12}>
        <TextField
          id='other_work_auth'
          name='other_work_auth'
          variant="standard"
          label="Specify Work Authorization"
          fullWidth
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
          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Please specify:</FormLabel>  
              <RadioGroup
                aria-label="green_card_citizen"
                id='green_card_citizen'
                name="green_card_citizen"
                row
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
    values.license === null ?
      <></>
      :
      (
        values.license ?
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                id='dl_num'
                name='dl_num'
                variant="standard"
                label="Driver License Number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="dl_exp_date"
                name="dl_exp_date"
                label="Expiration Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box component="form" onSubmit={(event) => handleAvatar(event)} noValidate sx={{ mt: 1 }}>
                <TextField
                  accept="image/*"
                  id="dl_img"
                  name="dl_img"
                  type="file"
                  onChange={handleAvatarChange}
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
          <Box component="form" onSubmit={(event) => handleAvatar(event)} noValidate sx={{ mt: 1 }}>
            <TextField
              accept="image/*"
              id="avatar"
              name="avatar"
              type="file"
              onChange={handleAvatarChange}
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
              aria-label="license"
              id='license'
              name="license"
              onChange={handleChange}
            >
              <FormControlLabel value='yes' control={<Radio />} label="Yes" />
              <FormControlLabel value='' control={<Radio />} label="No" />
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
              onChange={handleChange}
            >
              <FormControlLabel value='yes' control={<Radio />} label="Yes" />
              <FormControlLabel value='' control={<Radio />} label="No" />
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
            id="firstname"
            name="firstname"
            label="First Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="middlename"
            name="middlename"
            label="Middle Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="refer_phone" required>Phone</InputLabel>
            <Input
              value={values.refer_phone}
              onChange={handleChange}
              name="refer_phone"
              id="refer_phone"
              inputComponent={PhoneNumber}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="refer_email"
            name="refer_email"
            label="Email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="refer_address1"
            name="refer_address1"
            label="Address line 1"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="refer_city"
            name="refer_city"
            label="City"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="refer_state"
            name="refer_state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="refer_zip"
            name="refer_zip"
            label="Zip / Postal code"
            fullWidth
            variant="standard"
            onChange={handleChange}
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
    </React.Fragment >
  );
}