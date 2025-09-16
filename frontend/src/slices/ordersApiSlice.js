
import { apiSlice } from './apiSlice.js';
import { ORDERS_URL } from '../constants.js';


export const ordersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    createUsersOrder: builder.mutation({ 
      query: (order) => ({ 
        url: ORDERS_URL,
        method: 'POST',
        body: {...order}
      }),
    }),
    readUserOrderDetails: builder.query({ 
      query: (UserOrderId) => ({ 
        url: `${ORDERS_URL}/${UserOrderId}`,
        method: 'GET',  // Read function ('GET') by default
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
  }),
});

export const { 
  useCreateUsersOrderMutation, 
  useReadUserOrderDetailsQuery 
} = ordersApiSlice;
