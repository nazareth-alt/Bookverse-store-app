import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const updateLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const getRandomDiscount = () => Math.floor(Math.random() * 21) + 5; // 5% to 25%

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
          Swal.fire("Updated", "Quantity increased", "success");
        } else {
          Swal.fire("Oops!", "No more stock available", "warning");
        }
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
          stock: action.payload.stock || 5, // Default stock to 5 if not provided
          discountPercentage: getRandomDiscount(),
        };
        state.cartItems.push(newItem);
        Swal.fire("Added", "Book added to cart", "success");
      }

      updateLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      updateLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      updateLocalStorage([]);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== action.payload._id
        );
      }
      updateLocalStorage(state.cartItems);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;




