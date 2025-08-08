
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? 
  JSON.parse(localStorage.getItem("cart")) : 
    {cartItems: []};

    
const cartSlice = createSlice({ 
  name: "cart",
  initialState,
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
