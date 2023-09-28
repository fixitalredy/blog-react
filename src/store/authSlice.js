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
      console.log(response.data.user.token);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
    return null;
  }
);

const initialState = { regStatus: 'idle' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerAuth.pending, (state) => {
      state.regStatus = 'loading';
    });
    builder.addCase(registerAuth.fulfilled, (state) => {
      state.regStatus = 'resolved';
    });
    builder.addCase(registerAuth.rejected, (state) => {
      state.regStatus = 'rejected';
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
