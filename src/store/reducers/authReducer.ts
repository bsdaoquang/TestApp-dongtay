/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/UserModel';

const initialState: { authData: UserModel | null } = {
  authData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, _action) => {
      state.authData = null;
    },
    updateAuth: (state, action) => {
      const { authData }: { authData: any } = state;
      if (authData) {
        const newAuthData = {
          ...authData,
          ...action.payload,
        };
        state.authData = newAuthData;
      }
    },
  },
});

export const { addAuth, removeAuth, updateAuth } = authSlice.actions;
export const authSelector = (state: any) => state.auth.authData;

export const authReducer = authSlice.reducer;
