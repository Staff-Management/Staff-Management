import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    loggedin: false,
    email: "",
    role: "",
    token: "",
    username: "",
    password: "",
    repassword: "",
    workauth: "",
    personal_info: {
      firstName: "",
      middleName: "",
      lastName: "",
      preferredName: "",
      birthday: "",
      gender: "",
      ssn: "",
      avatar_file: null,
      avatar_path: "",
      avatar_data: "",
      avatar_src: "",
      driverLicense_own: null,
      driverLicense_path: "",
      driverLicense_num: "",
      driverLicense_exp: "",
      driverLicense_file: "",
      driverLicense_data: "",
      perm_citizen: null,
      green_card_citizen: "",
      work_auth: "",
      other_work_auth: "",
      workAuth_path: "",
      workAuth_start: "",
      workAuth_exp: "",
      workAuth_file: "",
      workAuth_data: "",
      ref_firstname: "",
      ref_middlename: "",
      ref_lastname: "",
      ref_phone: "",
      ref_email: "",
      ref_address1: "",
      ref_city: "",
      ref_state: "",
      ref_zip: "",
      ref_country: "",
      ref_relationship: ""
    },
    contact_info: {
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
    },
    emergency_contact: [{
      em_firstname: "",
      em_middlename: "",
      em_lastname: "",
      em_phone: "",
      em_email: "",
      em_relationship: ""
    }]
  },
  reducers: {
    setLogin: (state, action) => {
      state.loggedin = true;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
    setPassword: (state, action) => {
      state.password = action.payload.password;
    },
    setRePassword: (state, action) => {
      state.repassword = action.payload.repassword;
    },
    setPersonalInfo: (state, action) => {
      state.personal_info = action.payload;
    },
    setContactInfo: (state, action) => {
      const { val, list } = action.payload;
      state.contact_info = val;
      state.emergency_contact = JSON.parse(JSON.stringify(list));
    }
  },
});

export const { setLogin, setEmail, setRole, setToken, setUsername, setPassword, setRePassword, setPersonalInfo, setContactInfo } = slice.actions;

export const selectLogin = state => state.user.loggedin;
export const selectEmail = state => state.user.email;
export const selectRole = state => state.user.role;
export const selectToken = state => state.user.token;
export const selectUsername = state => state.user.username;
export const selectPassword = state => state.user.password;
export const selectRePassword = state => state.user.repassword;
export const selectPersonalInfo = state => state.user.personal_info;
export const selectContactInfo = state => state.user.contact_info;
export const selectEmergencyContact = state => state.user.emergency_contact;

export default slice.reducer;