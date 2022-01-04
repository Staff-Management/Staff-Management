import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    loggedin: false,
    email: '',
    role: '',
    token: '',
    username: '',
    password: '',
    repassword: ''
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
  },
});

export const { setLogin, setEmail, setRole, setToken, setUsername, setPassword, setRePassword } = slice.actions;

export const selectLogin = state => state.user.loggedin;
export const selectEmail = state => state.user.email;
export const selectRole = state => state.user.role;
export const selectToken = state => state.user.token;
export const selectUsername = state => state.user.username;
export const selectPassword = state => state.user.password;
export const selectRePassword = state => state.user.repassword;

export default slice.reducer;