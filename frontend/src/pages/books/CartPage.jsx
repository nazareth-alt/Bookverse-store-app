import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import {
  clearCart,
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from '../../redux/features/cart/cartSlice';

const STANDARD_SHIPPING_COST = 4.99;
const FREE_SHIPPING_THRESHOLD = 50;

const getEstimatedDelivery = () => {
  const today = new Date();
  const minDays = 2;
  const maxDays = 6;
  const start = new Date(today);
  start.setDate(start.getDate() + minDays);
  const end = new Date(today);
  end.setDate(end.getDate() + maxDays);
  const options = { month: 'short', day: 'numeric' };
  return `Estimated delivery: ${start.toLocaleDateString(undefined, options)} – ${end.toLocaleDateString(undefined, options)}`;
};

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleIncrease = (book) => {
    if (book.quantity < book.stock) {
      dispatch(addToCart(book));
    }
  };

  const handleDecrease = (book) => {
    if (book.quantity > 1) {
      dispatch(decreaseQuantity(book));
    }
  };

  const handleRemoveFromCart = (book) => {
    dispatch(removeFromCart(book));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const subtotal = cartItems.reduce((acc, book) => acc + book.newPrice * book.quantity, 0);
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const total = (subtotal + shippingCost).toFixed(2);

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-medium text-[#1e3a8a]">Shopping Cart</h2>
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-8">
          {cartItems.length > 0 ? (
            <ul className="-my-6 divide-y divide-gray-200">
              {cartItems.map((book) => (
                <li key={book._id} className="flex py-6">
                  {/* Book Image */}
                  <div className="relative w-28 h-44 shrink-0 flex items-center justify-center">
                    <Link to={`/books/${book._id}`}>
                      <img
                        src={getImgUrl(book.bookImage)}
                        alt={book.title}
                        className="w-full h-full object-cover rounded border"
                      />
                    </Link>
                  </div>

                  {/* Book Info */}
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <Link to={`/books/${book._id}`} className="hover:underline">
                        {book.title}
                      </Link>
                      <p>${(book.newPrice * book.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-600">Author: {book.author}</p>
                    <p className="text-sm text-gray-600">Genre: {book.genre}</p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {book.description || 'No description available.'}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {book.discountPercentage}% off
                    </p>
                    <p className="text-sm text-gray-500">In stock: {book.stock}</p>
                    <p className="text-sm text-indigo-500 mt-1 italic">
                      {getEstimatedDelivery()}
                    </p>

                    <div className="flex justify-between items-center mt-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Qty:</span>
                        <button
                          onClick={() => handleDecrease(book)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          −
                        </button>
                        <span className="px-2">{book.quantity}</span>
                        <button
                          onClick={() => handleIncrease(book)}
                          disabled={book.quantity >= book.stock}
                          className={`px-2 py-1 rounded ${
                            book.quantity >= book.stock
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(book)}
                        className="text-red-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="border-t px-4 py-6 sm:px-6">
        <div className="space-y-2 text-base text-gray-900">
          <div className="flex justify-between font-medium">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{qualifiesForFreeShipping ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-2">
            <p>Total (incl. shipping)</p>
            <p>${total}</p>
          </div>
          <div className="text-sm text-gray-600 pt-1 italic">
            {qualifiesForFreeShipping ? (
              <span className="text-green-600">🎉 You’ve qualified for Free Shipping!</span>
            ) : (
              `Spend $${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for Free Shipping`
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex justify-center bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link to="/">
            or <span className="font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


