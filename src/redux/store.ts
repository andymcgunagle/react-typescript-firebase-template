import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<StoreDispatch>();
