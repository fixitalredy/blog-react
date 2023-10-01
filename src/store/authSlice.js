import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.realworld.io/api';
axios.defaults.headers['Content-Type'] = 'application/json';

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (registerData) => {
    try {
      const response = await axios.post('/users', {
        user: {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        },
      });
      return response.data.user;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const loginAuth = createAsyncThunk(
  'auth/login',
  async (registerData) => {
    try {
      const response = await axios.post('/users/login', {
        user: {
          email: registerData.email,
          password: registerData.password,
        },
      });
      return response.data.user;
    } catch (err) {
      throw err.response.data;
    }
  }
);

export const edit = createAsyncThunk('auth/edit', async (editData) => {
  const tokend = JSON.parse(localStorage.user).token;
  try {
    const response = await axios.put('/user', {
      user: {
        email: editData.email,
        username: editData.username,
        password: editData.password,
        bio: null,
      },
      headers: {
        Authorization: `Bearer ${tokend}`,
      },
    });
    return response.data.user;
  } catch (err) {
    throw err.response.data;
  }
});

const initialState = {
  isLogged: false,
  loggedPerson: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setUser: (state, action) => {
      if (state.loggedPerson) {
        localStorage.user = JSON.stringify({
          username: state.loggedPerson.username,
          email: state.loggedPerson.email,
          image: state.loggedPerson.image,
          token: state.loggedPerson.token,
        });
      } else {
        state.loggedPerson = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loggedPerson = action.payload;
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loggedPerson = action.payload;
      })
      .addCase(loginAuth.rejected, (state) => {
        state.logStatus = 'rejected';
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
