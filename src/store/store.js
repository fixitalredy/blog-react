import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './articlesSlice';

const store = configureStore({
  reducer: articlesSlice.reducer,
});

export default store;
