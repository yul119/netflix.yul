import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slice/authSlice';
import { tokenReducer } from './slice/tokenSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    tokenReducer,
  },
});
