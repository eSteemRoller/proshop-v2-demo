
import { postNewProduct } from "../../../backend/controllers/productController";
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    })
    postNewProduct: builder.mutation({ 
      query: () => ({ 
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    })
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetProductDetailsQuery,
  usePostNewProductMutation 
} = 
  productsApiSlice;