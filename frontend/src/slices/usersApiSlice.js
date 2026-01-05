
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
    userProfile: builder.mutation({ 
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
    })
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useSignOutMutation, 
  useUserProfileMutation, 
  useGetAllUsersQuery,
  useDeleteUserMutation
} = usersApiSlice;
