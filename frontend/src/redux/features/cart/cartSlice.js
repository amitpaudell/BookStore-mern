import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product added to cart sucessfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: 'Already added to cart!',

          icon: 'warning',

          confirmButtonColor: '#3085d6',

          confirmButtonText: 'OK!',
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearFromCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearFromCart } = cartSlice.actions;
export default cartSlice.reducer;
