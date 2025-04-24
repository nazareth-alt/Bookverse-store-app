// src/hooks/useWishlist.js
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishlist,
} from "../redux/features/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const toggleWishlist = (book) => {
    const exists = wishlistItems.find((item) => item._id === book._id);
    if (exists) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishList(book));
    }
  };

  const isWishlisted = (bookId) =>
    wishlistItems.some((item) => item._id === bookId);

  return { toggleWishlist, isWishlisted };
};

export default useWishlist;
