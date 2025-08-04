
import { createSlice } from '@reduxjs/toolkit';


const initialState = localStorage.getItem("cart") ? 
  JSON.parse(localStorage.getItem("cart")) : 
  {cartItems: []};

const addDecimals = (num) => { 
  return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({ 
  name: "cart",
  initialState,
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

      // Calculate cart sub-total
      state.cartSubTotal = addDecimals(state.cartItems.reduce((acc, item) => 
        acc + item.price * 
        item.qty, 0)
      );

      // Calculate shipping (Free shipping with $100+ order, else $10)
      state.shippingPrice = addDecimals(state.cartSubTotal > 
        100 ? 0 : 10);

      // Calculate tax (10%)
      state.taxCost = addDecimals(Number((0.1 * state.cartSubTotal).toFixed(2)));

      // Calculate cart total
      state.cartTotal = ( 
        Number(state.cartSubTotal) + 
        Number(state.shippingPrice) + 
        Number(state.taxCost)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
