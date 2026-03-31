import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    return data;
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password })
);

export const getUserThunk = createAsyncThunk('user/getUser', () =>
  getUserApi()
);

export const logoutThunk = createAsyncThunk('user/logoutUser', () =>
  logoutApi()
);
