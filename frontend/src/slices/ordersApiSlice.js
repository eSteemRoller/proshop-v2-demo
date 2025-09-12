
import { apiSlice } from './apiSlice.js';
import { ORDERS_URL } from '../constants.js';


export const ordersApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    createUserOrder: builder.mutation({ 
      query: (order) => ({ 
        url: ORDERS_URL,
        method: 'POST',
        body: {...order}
      })
    })
  })
});

export const { useCreateUserOrderMutation } = ordersApiSlice;
