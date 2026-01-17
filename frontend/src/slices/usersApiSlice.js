
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    signIn: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/sign_in`,
        method: 'POST',
        body: userData,
      }),
    }),
    signUp: builder.mutation({ 
      query: (userData) => ({ 
        url: `${USERS_URL}`,
        method: 'POST',
        body: userData
      }),
    }),
    signOut: builder.mutation({ 
      query: () => ({ 
        url: `${USERS_URL}/sign_out`,
        method: 'POST',
      }),
    }),
    updateMyProfile: builder.mutation({ 
      query: (data) => ({ 
        url: `${USERS_URL}/my_profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    readAllUsers: builder.query({ 
      query: () => ({ 
        url: USERS_URL
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    readUserDetails: builder.query({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    }),
    updateUserDetails: builder.mutation({  // aka updateUser
      query: (data) => ({ 
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/usersByAdmin`,
        method: 'POST',
        body: userData
      }),
      invalidatesTags: ['Users']
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `${USERS_URL}/reset_password/${token}`,
        method: 'PUT',
        body: { password }
      }),
    }),
    deleteUser: builder.mutation({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useSignOutMutation, 
  useUpdateMyProfileMutation, 
  useReadAllUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useResetPasswordMutation,
  useReadUserDetailsQuery,
  useUpdateUserDetailsMutation
} = usersApiSlice;
