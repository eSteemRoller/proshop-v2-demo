
import { PRODUCTS_URL, PRODUCT_IMAGE_UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    userReadAllProducts: builder.query({
      query: ({ pageNumber, userId }) => ({
        url: userId ? `${PRODUCTS_URL}/user/${userId}` : PRODUCTS_URL,
        params: { 
          pageNumber,
        }
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5
    }),
    userReadProductById: builder.query({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/product/${productId}`,
      }),
      keepUnusedDataFor: 5
    }),
    userCreateProductReview: builder.mutation({  // aka createReview
      query: ({userData, data}) => ({ 
        url: `${PRODUCTS_URL}/user/${userData.userId}/product/${data.productId}/submit_review`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products']
    }),
    adminCreateProduct: builder.mutation({ 
      query: ({ pageNumber}) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/add_product`,
        method: 'POST',
        params: { 
          pageNumber,
        }
      }),
      invalidatesTags: ['Products'],
    }),
    adminReadAllProducts: builder.query({ 
      query: ({ pageNumber}) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/:pageNumber`,
        params: { 
          pageNumber,
        }
      }),
      invalidatesTags: ['Products'],
    }),
    adminReadProductById: builder.query({  // aka getProduct
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/product/${data.productId}`,
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    adminUpdateProductById: builder.mutation({  // aka updateProduct
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/product/${data.productId}/edit_product`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    adminUploadProductImage: builder.mutation({ 
      query: (data) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/product/${data.productId}/${PRODUCT_IMAGE_UPLOAD_URL}`,
        method: 'POST',
        body: data,
      })
    }),
    adminDeleteProductById: builder.mutation({ 
      query: ({ pageNumber, productId }) => ({ 
        url: `${PRODUCTS_URL}/admin/all_products/page/:pageNumber/product/${productId}/delete_product`,
        method: 'DELETE',
        params: { 
          pageNumber,
        }
      }),
      invalidatesTags: ['Products']
    }),
  }),
});

export const { 
  useUserReadAllProductsQuery, 
  useUserReadProductByIdQuery, 
  useUserCreateProductReviewMutation, 

  useAdminCreateProductMutation, 
  useAdminReadAllProductsQuery, 
  useAdminReadProductByIdQuery, 
  useAdminUpdateProductByIdMutation, 
  useAdminUploadProductImageMutation, 
  useAdminDeleteProductByIdMutation, 
} = 
  productsApiSlice;
