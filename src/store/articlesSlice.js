import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.realworld.io/api';
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidmllbm4xMDA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmllbm4xMDA5In0sImlhdCI6MTY5NTY0ODYwMywiZXhwIjoxNzAwODMyNjAzfQ.GXN8e2gwrwpte8WyVN6E9GPmsMGnql_gSJsUBUzGgVI */
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTE4NDkxZmYzY2M4MWIwMGRhYjI3OSIsInVzZXJuYW1lIjoidmllbm4xMDA5IiwiZXhwIjoxNzAwODMwODY1LCJpYXQiOjE2OTU2NDY4NjV9.C72ei4inuqX4F2Hq-SDgTyJmjmiFkHrCOndf47tDD-w */
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/articles/?limit=5&offset=${page * 5 - 5}`
      );
      const result = response.data.articles;
      console.log(response.data);
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
    return null;
  }
);
const initialState = { status: null, articles: [], error: null, page: 1 };

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const articlesActions = articlesSlice.actions;
export default articlesSlice;
