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
      return response.data.user;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
    return null;
  }
);

export const loginAuth = createAsyncThunk(
  'auth/login',
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
      return response.data.user;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
    return null;
  }
);

const initialState = {
  isLogged: false,
  loggedPerson: {
    username: '',
    email: '',
    image: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.fulfilled, (state, action) => {
        localStorage.token = JSON.stringify(action.payload.token);
        state.isLogged = true;
        state.loggedPerson = {
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image,
        };
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.isLogged = true;
        localStorage.token = JSON.stringify(action.payload.token);
        state.loggedPerson = {
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image,
        };
      })
      .addCase(loginAuth.rejected, (state) => {
        state.logStatus = 'rejected';
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
