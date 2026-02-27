import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    authUser: builder.mutation({
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
    userSignOut: builder.mutation({ 
      query: () => ({ 
        url: `${USERS_URL}/sign_out`,
        method: 'POST',
        credentials: 'include'
      }),
    }),
    userForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot_password`,
        method: 'POST',
        body: data,
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
      query: (userId) => ({ 
        url: `${USERS_URL}/user/${userId}/my_profile`,
      }),
    }),
    userUpdateMyProfile: builder.mutation({ 
      query: ({userId, ...body}) => ({ 
        url: `${USERS_URL}/user/${userId}/my_profile`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, { userId }) => [ 
        { type: 'User', id: userId }, 
        { type: 'Users', id: 'LIST' } 
       ]
    }),
    adminCreateUserByAdmin: builder.mutation({
      query: ({userId, ...body}) => ({
        url: `${USERS_URL}/user/${userId}/admin/all_users/add_user`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    adminReadAllUsers: builder.query({ 
      query: ({ userId, page, keyword = '' }) => ({ 
        url: `${USERS_URL}/user/${userId}/admin/all_users`,
        params: { page, keyword }
      }),
      providesTags: (result) => 
        result?.users 
          ? [ 
              ...result.users.map((u) => ({ type: 'User', id: u._id })), 
              { type: 'Users', id: 'LIST' } 
            ] 
          : [{ type: 'Users', id: 'LIST' }],
    }),
    adminReadUserById: builder.query({ 
      query: ({ userId, targetUserId }) => ({ 
        url: `${USERS_URL}/user/${userId}/admin/all_users/user/${targetUserId}`,
      }),
      providesTags: (result, error, { targetUserId }) => [
        { type: 'User', id: targetUserId }
      ],
    }),
    adminUpdateUserById: builder.mutation({
      query: ({ userId, targetUserId, ...body }) => ({ 
        url: `${USERS_URL}/user/${userId}/admin/all_users/user/${targetUserId}/edit_user`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, { targetUserId }) => [ 
        { type: 'User', id: targetUserId }, 
        { type: 'Users', id: 'LIST' } 
       ]
    }),
    adminDeleteUserById: builder.mutation({ 
      query: ({ userId, targetUserId }) => ({ 
        url: `${USERS_URL}/user/${userId}/admin/all_users/user/${targetUserId}/delete_user`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { targetUserId }) => [ 
        { type: 'User', id: targetUserId }, 
        { type: 'Users', id: 'LIST' } 
       ],
      keepUnusedDataFor: 5
    })
  }),
});

export const {
  useAuthUserMutation, 
  useSignUpMutation, 
  useUserForgotPasswordMutation,
  useUserResetPasswordMutation, 
  useUserSignOutMutation,
  
  useUserReadMyProfileQuery, 
  useUserUpdateMyProfileMutation, 
  
  useAdminCreateUserByAdminMutation,
  useAdminReadAllUsersQuery, 
  useAdminReadUserByIdQuery, 
  useAdminUpdateUserByIdMutation, 
  useAdminDeleteUserByIdMutation 
} = usersApiSlice;