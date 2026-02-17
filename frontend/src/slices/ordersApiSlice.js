import { apiSlice } from './apiSlice.js';
import { ORDERS_URL, PAYPAL_URL } from '../constants.js';


export const ordersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    userCreateMyOrder: builder.mutation({ 
      query: ({userId, order}) => ({ 
        url: `${ORDERS_URL}/user/${userId}/order/submit_order`,
        method: 'POST',
        body: {...order}
      }),
    }),
    userReadPayPalClientId: builder.query({ 
      query: () => ({ 
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    userPayOrder: builder.mutation({ 
      query: ({userId, orderId, details}) => ({ 
        url: `${ORDERS_URL}/user/${userId}/order/${orderId}/mark_order_as_paid`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    userReadAllMyOrders: builder.query({ 
      query: ({ userId, page }) => ({ 
        url: `${ORDERS_URL}/user/${userId}/my_orders`,
        params: { page }
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    userReadMyOrderById: builder.query({ 
      query: ({ userId, orderId, details }) => ({ 
        url: `${ORDERS_URL}/user/${userId}/my_orders/order/${orderId}`,
        body: { ...details }
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    adminReadAllOrders: builder.query({ 
      query: ({ pageNumber }) => ({ 
        url: `${ORDERS_URL}/admin/all_orders/:pageNumber`,
        params: { 
          pageNumber,
        }
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    adminReadOrderById: builder.query({ 
      query: ({ orderId, details }) => ({ 
        url: `${ORDERS_URL}/admin/all_orders/order/${orderId}`,
        body: { ...details }
      }),
      keepUnusedDataFor: 5,  // Seconds
    }),
    adminUpdateOrderById: builder.mutation({ 
      query: ({ orderId }) => ({ 
        url: `${ORDERS_URL}/admin/all_orders/order/${orderId}/edit_order`,
        method: 'PUT',
      }),
    }),
    adminUpdateOrderAsDelivered: builder.mutation({ 
      query: ({ orderId }) => ({ 
        url: `${ORDERS_URL}/admin/all_orders/order/${orderId}/mark_order_as_delivered`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { 
  useUserCreateMyOrderMutation, 
  useUserReadPayPalClientIdQuery, 
  useUserPayOrderMutation, 
  useUserReadAllMyOrdersQuery, 
  useUserReadMyOrderByIdQuery, 
  
  useAdminReadAllOrdersQuery, 
  useAdminReadOrderByIdQuery, 
  useAdminUpdateOrderByIdMutation, 
  useAdminUpdateOrderAsDeliveredMutation
} = ordersApiSlice;