import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToWishList } from "../redux/features/wishlist/wishlistSlice";

const SyncWishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    storedWishlist.forEach((item) => {
      dispatch(addToWishList(item));
    });
  }, [dispatch]);

  return null;
};

export default SyncWishlist;
