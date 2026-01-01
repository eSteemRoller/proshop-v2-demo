
// import { postNewProduct, updateProduct } from "../../../backend/controllers/productController";
import { PRODUCTS_URL, PRODUCT_IMAGE_UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({ 
  endpoints: (builder) => ({ 
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({ 
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    postNewProduct: builder.mutation({ 
      query: () => ({ 
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateAProduct: builder.mutation({ 
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
    })
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetProductDetailsQuery,
  usePostNewProductMutation, 
  useUpdateAProductMutation,
  useUploadProductImageMutation
} = 
  productsApiSlice;
