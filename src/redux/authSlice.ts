import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  uid: string | null | undefined,
};

const initialState: InitialState = {
  uid: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth(state, _) {
      state = {
        ...initialState,
        uid: null,
      };
    },
    setUid(state, { payload }) {
      state.uid = payload;
    },
  },
});

export const {
  resetAuth,
  setUid,
} = authSlice.actions;

export const authReducer = authSlice.reducer;