
// import { postNewProduct, updateProduct } from "../../../backend/controllers/productController";
// import { deleteProduct } from "../../../backend/controllers/productController";
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
    editProduct: builder.mutation({  // aka updateProduct
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
      })
    }),
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetProductDetailsQuery,
  usePostNewProductMutation, 
  useEditProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation
} = 
  productsApiSlice;
