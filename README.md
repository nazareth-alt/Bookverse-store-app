# 📚 Full Stack BookVerse store App

A modern full-stack BookVerse store App application built with **React**, **Tailwind CSS**, **Firebase Authentication**, **MongoDB**, and **Express.js**. It features user and admin authentication, book browsing with filtering and sorting, a cart and wishlist system, orders, event listings, and an admin dashboard for managing books.

---

## 🔗 Live Preview
Coming Soon...

---

## 🛠️ Tech Stack

### Frontend
- React + React Router DOM
- Tailwind CSS
- Redux Toolkit
- Firebase Auth (Email/Password & Google)
- SweetAlert2
- Swiper

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK (if applicable for role management)

---

## 🚀 Features

### 🧑 Users
- Register, Login, Google Sign-In
- Browse and search books
- Filter by genre, author, format
- Add/remove from wishlist and cart
- Secure checkout
- View orders
- Update profile / Reset password / Delete account

### 🛒 Shop
- Featured books with best-seller badges
- Detailed book pages with ratings
- Wishlist (with heart toggle)
- Cart management with subtotal and quantity
- Discount codes and stock logic

### 🧑‍💼 Admin
- Login with credentials
- Add, edit, and delete books
- Dashboard stats (orders, sales, books)

> ✅ **Admin Credentials:**
> - **Username:** `nazareth`
> - **Password:** `123456`

### 📆 Events Page
- Event listings with images, dates, and categories
- Sidebar with latest posts and tags

---

## 🔐 Authentication

Authentication is handled via Firebase. User sessions are maintained using Firebase Auth and synced with Firestore for user data persistence.

- `AuthContext` provides login, logout, registration, and state management.
- `PrivateRoute` protects user routes.
- `AdminRoute` restricts access to admin dashboard.

---

## 📁 Additional files
frontend.env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
...

backend.env
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret

vercel link to bookverse project
https://bookverse-store-app-naz.vercel.app

🙌 Credits
Built with ❤️ by Nazareth.
