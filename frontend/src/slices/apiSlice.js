
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { signOut } from './authApiSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

// Wrap the baseQuery to handle token expiration (401) globally.
const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired or unauthorized - clear credentials and force login
    api.dispatch(signOut());
    if (typeof window !== 'undefined') {
      // Preserve current path so user can be redirected back after login
      const current = window.location.pathname + window.location.search;
      const redirect = encodeURIComponent(current || '/');
      window.location.href = `/sign_in?sessionExpired=1&redirect=${redirect}`;
    }
  }

  return result;
};

export const apiSlice = createApi({ 
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});
