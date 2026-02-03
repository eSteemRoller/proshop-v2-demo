
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
      query: ({UserOrderId, details}) => ({ 
        url: `${ORDERS_URL}/${UserOrderId}/paid`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    readPayPalClientId: builder.query({ 
      query: () => ({ 
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    readMyOrders: builder.query({ 
      query: ({ userInfo, pageNumber }) => ({ 
        url: `${ORDERS_URL}/user/${userInfo._id}/my_orders/:pageNumber`,
        params: { 
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    readMyOrdersDetails: builder.query({ 
      query: ({ userId, pageNumber, UserOrderId, details }) => ({ 
        url: `${ORDERS_URL}/user/${userId}/my_orders/order/${UserOrderId}`,
        params: { 
          pageNumber,
        },
        body: { ...details }
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    readAllOrders: builder.query({ 
      query: ({ pageNumber }) => ({ 
        url: `${ORDERS_URL}/admin/all_orders/:pageNumber`,
        params: { 
          pageNumber,
        }
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    updateOrderAsDelivered: builder.mutation({ 
      query: (orderId) => ({ 
        url: `${ORDERS_URL}/${orderId}/delivered`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { 
  useCreateUsersOrderMutation, 
  useReadUsersOrderDetailsQuery,
  usePayOrderMutation,
  useReadPayPalClientIdQuery, 
  useReadMyOrdersQuery,
  useReadMyOrdersDetailsQuery,
  useReadAllOrdersQuery,
  useUpdateOrderAsDeliveredMutation,
} = ordersApiSlice;
