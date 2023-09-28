import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.realworld.io/api';
const axiosHeaders = {
  'Content-Type': 'application/json',
};

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (registerData, { rejectWithValue }) => {
    const personData = {
      user: {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      },
    };
    const config = {
      url: '/users',
      method: 'POST',
      headers: axiosHeaders,
      data: JSON.stringify(personData),
    };
    try {
      const response = await axios(config);
      return response.data.token;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
    return null;
  }
);

export const loginAuth = createAsyncThunk(
  'auth/register',
  async (registerData, { rejectWithValue }) => {
    const personData = {
      user: {
        email: registerData.email,
        password: registerData.password,
      },
    };
    const config = {
      url: '/users/login',
      method: 'POST',
      headers: axiosHeaders,
      data: JSON.stringify(personData),
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
    return null;
  }
);

const initialState = { logStatus: 'idle', logedPerson: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.logStatus = 'loading';
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.logStatus = 'loged';
        state.logedPerson = { ...action.payload.user, token: '' };
      })

      .addCase(loginAuth.rejected, (state) => {
        state.logStatus = 'rejected';
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
