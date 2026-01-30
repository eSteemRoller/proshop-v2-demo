
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
    readProductById: builder.query({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/product/${productId}`,
      }),
      keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({ 
      query: () => ({ 
        url: `${PRODUCTS_URL}/admin/all_products`,
        method: 'POST',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProductById: builder.mutation({  // aka updateProduct
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/product/${data.productId}/edit_product`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({ 
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/product/${data.productId}/${PRODUCT_IMAGE_UPLOAD_URL}`,
        method: 'POST',
        body: data,
      })
    }),
    deleteProductById: builder.mutation({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/${productId}/delete_product`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products']
    }),
    createProductReview: builder.mutation({  // aka createReview
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/product/${data.productId}/create_review`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products']
    })
  }),
});

export const { 
  useReadAllProductsQuery, 
  useReadProductByIdQuery,
  useCreateProductMutation, 
  useUpdateProductByIdMutation,
  useUploadProductImageMutation,
  useDeleteProductByIdMutation,
  useCreateProductReviewMutation
} = 
  productsApiSlice;
