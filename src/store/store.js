import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlesSlice from './articlesSlice';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  articlesReducer: articlesSlice.reducer,
  authReducer: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
