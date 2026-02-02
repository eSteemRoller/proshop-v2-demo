
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
        url: `${USERS_URL}/sign_up`,
        method: 'POST',
        body: userData,
      }),
    }),
    readMyUserProfile: builder.query({ 
      query: (userData) => ({ 
        url: `${USERS_URL}/user/${userData.userId}/my_profile`,
        body: userData,
      }),
    }),
    updateMyUserProfile: builder.mutation({ 
      query: (userData) => ({ 
        url: `${USERS_URL}/user/${userData.userId}/my_profile`,
        method: 'PUT',
        body: userData,
      }),
    }),
    signOut: builder.mutation({ 
      query: () => ({ 
        url: `${USERS_URL}/sign_out`,
        method: 'POST',
      }),
    }),
    readAllUsers: builder.query({ 
      query: ({ pageNumber }) => ({ 
        url: `${USERS_URL}/admin/all_users/:pageNumber`,
        params: { 
          pageNumber,
        }
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    readUserById: builder.query({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/admin/all_users/user/${userId}/edit_user`,
      }),
      keepUnusedDataFor: 5
    }),
    updateUserById: builder.mutation({  // aka updateUser
      query: (userData) => ({ 
        url: `${USERS_URL}/admin/all_users/user/${userData.userId}/edit_user`,
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
        url: `${USERS_URL}/admin/all_users/user/${userId}/delete_user`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
    }),
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useReadMyUserProfileQuery,
  useUpdateMyUserProfileMutation, 
  useSignOutMutation, 
  useResetPasswordMutation, 
  useReadAllUsersQuery,
  useReadUserByIdQuery, 
  useUpdateUserByIdMutation, 
  useAddUserByAdminMutation, 
  useDeleteUserMutation,
} = usersApiSlice;
