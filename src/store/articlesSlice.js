/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.realworld.io/api';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page = 1, { rejectWithValue, getState }) => {
    const user = getState().authReducer.loggedPerson;
    let config;
    if (user) {
      config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    }
    try {
      const response = await axios.get(
        `/articles/?limit=5&offset=${page * 5 - 5}`,
        config
      );
      const result = response.data.articles;
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
    return null;
  }
);
export const createArticle = createAsyncThunk(
  'articles/createArticles',
  async (creationData, { rejectWithValue, getState }) => {
    const user = getState().authReducer.loggedPerson;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.post(
        '/articles/',
        {
          article: {
            title: creationData.title,
            body: creationData.text,
            description: creationData.description,
            tagList: creationData.tags,
          },
        },
        config
      );
      const result = response.data;
      console.log(result);
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
  reducers: {},
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
