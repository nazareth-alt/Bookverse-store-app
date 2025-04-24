import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import { AuthProvide } from "../context/AuthContext";
import Home from "../pages/home/Home";
import BookShop from "../pages/books/BookShop";
import EventsPage from "../pages/books/EventsPage";
import SearchResults from "../components/SearchResults";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import WishlistPage from "../pages/books/WishlistPage"
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import OrderPage from "../pages/books/OrderPage";
import AdminLogin from "../components/AdminLogin";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import ServicesPage from "../pages/home/ServicesPage";
import AboutPage from "../pages/home/AboutPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ForgotPassword from "../pages/Auth Support Pages/ForgotPassword";
import UpdateProfile from "../pages/Auth Support Pages/UpdateProfile";
import DeleteAccount from "../pages/Auth Support Pages/DeleteAccount";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";

import AudioBooks from "../pages/home/categories/AudioBooks";
import BestSellers from "../pages/home/categories/BestSellers";
import NewRelease from "../pages/home/categories/NewRelease";
import ComingSoon from "../pages/home/categories/ComingSoon";
import EBooks from "../pages/home/categories/EBooks";
import Sales from "../pages/home/categories/Sales";


const router = createBrowserRouter([
  {
      path: "/",
      element: (<AuthProvide><App/></AuthProvide>),
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <BookShop />},
        { path: "events", element: <EventsPage /> },
        { path: "search", element: <SearchResults /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "cart", element: <CartPage /> },
        { path: "wishlistPage", element: <WishlistPage />},
        { path: "services", element: <ServicesPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> },
        { path: "orders", element: <PrivateRoute><OrderPage /></PrivateRoute> },
        { path: "books/:id", element: <SingleBook /> },
        { path: "user-dashboard", element: <PrivateRoute><UserDashboard /></PrivateRoute> },
        { path: "update-profile", element: <UpdateProfile /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "delete-account", element: <DeleteAccount /> },
        
        // Book Categories
        { path: "best-sellers", element: <BestSellers /> },
        { path: "new-release", element: <NewRelease /> },
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "audio-books", element: <AudioBooks /> },
        { path: "e-books", element: <EBooks /> },
        { path: "sales", element: <Sales /> },
      ]
    },


    // Admin login page
    { path: "/admin", element: <AdminLogin /> },


    // Admin dashboard routes
    {
      path: "/dashboard",
      element: <AdminRoute><DashboardLayout /></AdminRoute>,
      children: [
        { path: "", element: <AdminRoute><Dashboard /></AdminRoute>  },
        { path: "add-new-book", element: <AdminRoute><AddBook /></AdminRoute> },
        { path: "edit-book/:id", element: <AdminRoute><UpdateBook /></AdminRoute> },
        { path: "manage-books", element:  <AdminRoute><ManageBooks /></AdminRoute> },
      ]
    }
  ]);

  export default router;