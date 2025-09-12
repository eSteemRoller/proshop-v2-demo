
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialCartState = localStorage.getItem("cart") ? 
  JSON.parse(localStorage.getItem("cart")) : 
    { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

    
const cartSlice = createSlice({ 
  name: "cart",
  initialState: initialCartState,
  reducers: { 
    addToCart: (cartState, action) => {
      const item = action.payload;

      const existItem = cartState.cartItems.find((checkItem) => 
        checkItem._id === item._id);

      if (existItem) {
        cartState.cartItems = cartState.cartItems.map((checkItem) => 
          checkItem._id === existItem._id ? 
          item : checkItem)
      } else { 
        cartState.cartItems = [...cartState.cartItems, item];
      }
      return updateCart(cartState);
    },
    removeFromCart: (cartState, action) => { 
      cartState.cartItems = cartState.cartItems.filter((xItem) => 
        xItem._id !== action.payload);
      return updateCart(cartState);
    },
    saveBillingAddress: (cartState, action) => { 
      cartState.billingAddress = action.payload;
      return updateCart(cartState);
    },
    saveShippingAddress: (cartState, action) => { 
      cartState.shippingAddress = action.payload;
      return updateCart(cartState);
    },
    savePaymentMethod: (cartState, action) => { 
      cartState.paymentMethod = action.payload;
      return updateCart(cartState);
    },
    clearCartAfterOrder: (cartState, action) => { 
      cartState.cartItems = [];
      return updateCart(cartState);
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
} = cartSlice.actions;

export default cartSlice.reducer;
