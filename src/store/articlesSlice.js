import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      let response = await fetch(
        `https://api.realworld.io/api/articles?page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer  xxxxxx.yyyyyyy.zzzzzz',
          },
        }
      );
      response = await response.json();
      const data = response.articles;
      return data;
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
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const articlesActions = articlesSlice.actions;
export default articlesSlice;
