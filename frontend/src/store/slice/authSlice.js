import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { userAPIs } from '../callAPIs';

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (token) => {
    const res = await userAPIs.apiFetchUser(token);
    return res;
  }
);

const initialState = {
  user: undefined,
  isLogin: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const newState = { ...state, isLogin: true };
      return newState;
    },
    logoutAction: (state, action) => {
      const newState = {
        ...state,
        isLogin: false,
        user: undefined,
      };
    },
  },
  extraReducers: {
    [getUserInfo.pending]: (state, action) => {
      console.log('pending');
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.user = action.payload.data;
    },
    [getUserInfo.rejected]: (state, action) => {
      console.log('false');
    },
  },
});

export const { loginAction } = authSlice.actions;

export const authReducer = authSlice.reducer;

export default authSlice;
