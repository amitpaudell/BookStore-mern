import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItems = state.cartItems.find(
        (items) => items._id === action.payload._id
      );
      if (!existingItems) {
        state.cartItems.push(action.payload);
        alert('Items added sucessfully');
      } else {
        alert('Item already exist');
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
