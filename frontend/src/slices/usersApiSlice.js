
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
        body: userData,
      }),
    }),
    signOut: builder.mutation({ 
      query: () => ({ 
        url: `${USERS_URL}/sign_out`,
        method: 'POST',
      }),
    }),
    updateMyProfile: builder.mutation({ 
      query: (userData) => ({ 
        url: `${USERS_URL}/${userData.userId}/my_profile`,
        method: 'PUT',
        body: userData,
      }),
    }),
    readAllUsers: builder.query({ 
      query: () => ({ 
        url: USERS_URL,
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    readUserDetails: builder.query({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5
    }),
    updateUserDetails: builder.mutation({  // aka updateUser
      query: (userData) => ({ 
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['Users']
    }),
    addUserByAdmin: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/add_user`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users']
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `${USERS_URL}/reset_password/${token}`,
        method: 'PUT',
        body: { password },
      }),
    }),
    deleteUser: builder.mutation({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
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
  useAddUserByAdminMutation,
  useResetPasswordMutation,
  useReadUserDetailsQuery,
  useUpdateUserDetailsMutation
} = usersApiSlice;
