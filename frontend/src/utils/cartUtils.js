export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate cart sub-total
  state.cartSubTotal = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping (Free shipping with $100+ order, else $10)
  state.shippingPrice = addDecimals(state.cartSubTotal > 100 ? 0 : 10);

  // Calculate tax (10%)
  state.taxCost = addDecimals(Number((0.1 * state.cartSubTotal).toFixed(2)));

  // Calculate cart total
  state.cartTotal = (
    Number(state.cartSubTotal) +
    Number(state.shippingPrice) +
    Number(state.taxCost)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};