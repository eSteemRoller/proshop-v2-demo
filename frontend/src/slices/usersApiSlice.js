
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
    editMyProfile: builder.mutation({ 
      query: (data) => ({ 
        url: `${USERS_URL}/my_profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getAllUsers: builder.query({ 
      query: () => ({ 
        url: USERS_URL
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    deleteUser: builder.mutation({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      }),
    }),
    getUserDetails: builder.query({ 
      query: (userId) => ({ 
        url: `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    }),
    editUserDetails: builder.mutation({  // aka updateUser
      query: (data) => ({ 
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Users']
    })
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useSignOutMutation, 
  useEditMyProfileMutation, 
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useEditUserDetailsMutation
} = usersApiSlice;
