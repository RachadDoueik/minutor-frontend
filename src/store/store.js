import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userManagementReducer from './userManagementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userManagement: userManagementReducer,
  },
});

export default store;