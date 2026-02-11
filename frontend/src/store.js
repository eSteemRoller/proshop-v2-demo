import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authApiSliceReducer from './slices/authApiSlice';
import cartApiSliceReducer from './slices/cartApiSlice';

const store = configureStore({
  reducer: { 
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authApiSliceReducer,
    cart: cartApiSliceReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat
      (apiSlice.middleware),
  devTools: true,
});

export default store;