import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    value: false
  },
  reducers: {
    setLogin: (state, action) => {
      state.value = true;
    }
  },
});

export const { setLogin } = slice.actions;

export const selectUser = state => state.user.value;

export default slice.reducer;