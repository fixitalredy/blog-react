import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.realworld.io/api';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/articles/?limit=5&offset=${page * 5 - 5}`
      );
      const result = response.data.articles;
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
