
import { PRODUCTS_URL, PRODUCT_IMAGE_UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    readAllProducts: builder.query({
      query: ({ pageNumber}) => ({
        url: PRODUCTS_URL,
        params: { 
          pageNumber,
        }
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5
    }),
    readProduct: builder.query({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({ 
      query: () => ({ 
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({  // aka updateProduct
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({ 
      query: (data) => ({ 
        url: `${PRODUCT_IMAGE_UPLOAD_URL}`,
        method: 'POST',
        body: data,
      })
    }),
    deleteProduct: builder.mutation({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products']
    }),
    createProductReview: builder.mutation({  // aka createReview
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products']
    })
  }),
});

export const { 
  useReadAllProductsQuery, 
  useReadProductQuery,
  useCreateProductMutation, 
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation
} = 
  productsApiSlice;
