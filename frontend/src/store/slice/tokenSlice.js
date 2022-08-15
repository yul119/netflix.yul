import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: { token: undefined },
  reducers: {
    setToken: (state, action) => {
      const newState = { ...state, token: action.payload };
      return newState;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export const tokenReducer = tokenSlice.reducer;

export default tokenSlice;
