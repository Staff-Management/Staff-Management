import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    loggedin: false,
    email: '',
    token: '',
    username: '',
    password: '',
    repassword: '',
    workauth: '',
  },
  reducers: {
    setLogin: (state, action) => {
      state.loggedin = true;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
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
    setWorkAuth: (state, action) => {
      state.workauth = action.payload.workauth;
    }
  },
});

export const { setLogin, setEmail, setToken, setUsername, setPassword, setRePassword, setWorkAuth } = slice.actions;

export const selectUser = state => state.user.loggedin;
export const selectEmail = state => state.user.email;
export const selectToken = state => state.user.token;
export const selectUsername = state => state.user.username;
export const selectPassword = state => state.user.password;
export const selectRePassword = state => state.user.repassword;
export const selectWorkAuth = state => state.user.workauth;

export default slice.reducer;