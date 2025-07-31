
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { useGetProductsQuery } from '../slices/productsApiSlice.js';


export const productApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;