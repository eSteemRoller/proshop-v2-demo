
import { apiSlice } from './apiSlice.js';
import { ORDERS_URL, PAYPAL_URL } from '../constants.js';


export const ordersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    createUsersOrder: builder.mutation({ 
      query: (order) => ({ 
        url: ORDERS_URL,
        method: 'POST',
        body: {...order}
      }),
    }),
    readUsersOrderDetails: builder.query({ 
      query: (UserOrderId) => ({ 
        url: `${ORDERS_URL}/${UserOrderId}`,
        method: 'GET',  // Read function ('GET') by default
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    payOrder: builder.mutation({ 
      query: (UserOrderId, details) => ({ 
        url: `${ORDERS_URL}/${UserOrderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    readPayPalClientId: builder.query({ 
      query: () => ({ 
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,  // Seconds
    })
  }),
});

export const { 
  useCreateUsersOrderMutation, 
  useReadUsersOrderDetailsQuery,
  usePayOrderMutation,
  useReadPayPalClientIdQuery 
} = ordersApiSlice;
