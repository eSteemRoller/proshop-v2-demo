
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    login: builder.mutation({
      query: (userData) => ({
        url: USERS_URL/auth,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
