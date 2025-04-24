import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

// in wishlistSlice.js
const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

export const wishlistsSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const exists = state.wishlistItems.find(item => item._id === action.payload._id);
      if (!exists) {
        state.wishlistItems.push(action.payload);
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
      } else {
        toast.error("Book is already in your wishlist.");
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.payload._id);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.setItem("wishlistItems", JSON.stringify([]));
    },
  },
});


// Action creators are generated for each case reducer function
// export const { } = cartsSlice.actions

export const { addToWishList, removeFromWishlist, clearWishlist } = wishlistsSlice.actions

export default wishlistsSlice.reducer





 


