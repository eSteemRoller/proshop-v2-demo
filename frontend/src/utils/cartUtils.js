
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (cartState) => {
  // Calculate cart sub-total
  cartState.cartSubTotal = addDecimals(
    cartState.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping (Free shipping with $100+ order, else $10)
  cartState.shippingPrice = addDecimals(cartState.cartSubTotal > 100 ? 0 : 10);

  // Calculate tax (10%)
  cartState.taxCost = addDecimals(Number((0.1 * cartState.cartSubTotal).toFixed(2)));

  // Calculate cart total
  cartState.cartTotal = (
    Number(cartState.cartSubTotal) +
    Number(cartState.shippingPrice) +
    Number(cartState.taxCost)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cartState));

  return cartState;
};
