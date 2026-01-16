
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialstate = localStorage.getItem("cart") ? 
  JSON.parse(localStorage.getItem("cart")) : 
    { cartItems: [], billingAddress: {}, shippingAddress: {}, paymentMethod: 'PayPal' };

    
const cartApiSlice = createSlice({ 
  name: "cart",
  initialState: initialstate,
  reducers: { 
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((checkItem) => 
        checkItem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((checkItem) => 
          checkItem._id === existItem._id ? 
          item : checkItem)
      } else { 
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => { 
      state.cartItems = state.cartItems.filter((xItem) => 
        xItem._id !== action.payload);
      return updateCart(state);
    },
    saveBillingAddress: (state, action) => { 
      state.billingAddress = action.payload;
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => { 
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => { 
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartAfterOrder: (state, action) => { 
      state.cartItems = [];
      return updateCart(state);
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  saveBillingAddress, 
  saveShippingAddress, 
  savePaymentMethod, 
  clearCartAfterOrder,
} = cartApiSlice.actions;

export default cartApiSlice.reducer;
