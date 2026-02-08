
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
    signOut: builder.mutation({ 
      query: () => ({ 
        url: `${USERS_URL}/sign_out`,
        method: 'POST',
      }),
    }),
    userResetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `${USERS_URL}/reset_password/${token}`,
        method: 'PUT',
        body: { password },
      }),
    }),
    userReadMyProfile: builder.query({ 
      query: (userData) => ({ 
        url: `${USERS_URL}/user/${userData.userId}/my_profile`,
        body: userData,
      }),
    }),
    userUpdateMyProfile: builder.mutation({ 
      query: (userData) => ({ 
        url: `${USERS_URL}/user/${userData.userId}/my_profile`,
        method: 'PUT',
        body: userData,
      }),
    }),
    adminCreateUserByAdmin: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/admin/all_users/add_user`,
        method: 'POST',
        body: userData
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    adminReadAllUsers: builder.query({ 
      query: ({ page }) => ({ 
        url: `${USERS_URL}/admin/all_users`,
        params: { page },
      }),
      providesTags: (result) => 
        result?.users 
          ? [ 
              ...result.users.map((u) => ({ type: 'User', id: u._id })), 
              { type: 'Users', id: 'LIST' } 
            ] 
          : [{ type: 'Users', id: 'LIST' }],
      keepUnusedDataFor: 5
    }),
    adminReadUserById: builder.query({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/admin/all_users/user/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: 'Users', id: userId }],
      keepUnusedDataFor: 5
    }),
    adminUpdateUserById: builder.mutation({  // aka updateUser
      query: ({ userId, ...userData}) => ({ 
        url: `${USERS_URL}/admin/all_users/user/${ userId }/edit_user`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { userId }) => [ 
        { type: 'User', id: userId }, 
        { type: 'Users', id: 'LIST' } 
       ]
    }),
    adminDeleteUserById: builder.mutation({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/admin/all_users/user/${userId}/delete_user`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { userId }) => [ 
        { type: 'User', id: userId }, 
        { type: 'Users', id: 'LIST' } 
       ]
    }),
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useSignOutMutation, 
  useUserResetPasswordMutation, 
  useUserReadMyProfileQuery, 
  useUserUpdateMyProfileMutation, 
  
  useAdminCreateUserByAdminMutation,
  useAdminReadAllUsersQuery, 
  useAdminReadUserByIdQuery, 
  useAdminUpdateUserByIdMutation, 
  useAdminDeleteUserByIdMutation 
} = usersApiSlice; 
