import { Outlet, useLocation, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Banner from "./pages/home/Banner";
import SyncWishlist from "./components/SyncWishlist";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "./context/AuthContext";
import { LogOut } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    let inactivityTimer;
    const loadingTimer = setTimeout(() => setLoading(false), 2000);
  
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (currentUser) {
          logout();
          alert("Logged out due to inactivity.");
        }
      }, 10 * 60 * 1000);
    };
  
    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
  
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
  
    resetTimer();
  
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(inactivityTimer);
      clearTimeout(loadingTimer);
    };
  }, [currentUser, logout]);
  
  

  if (loading) return <Loading />;

  const isHomePage = location.pathname === "/";
  const showNavbarPages = ["/login", "/register"];
  const shouldShowNavbar =
    !isHomePage || showNavbarPages.includes(location.pathname);
  const shouldShowBreadcrumb = !isHomePage;

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter(Boolean);
    return (
      <nav className="bg-white py-3 px-6 shadow-md text-sm text-blue-700 font-medium">
        <ol className="list-reset flex items-center space-x-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:underline text-[#1e3a8a]"
            >
              <IoMdArrowRoundBack className="text-lg" />
              Back
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={to} className="flex items-center space-x-2">
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="text-[#1e3a8a] capitalize">
                    {decodeURI(value)}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="hover:underline capitalize text-[#1e3a8a]"
                  >
                    {decodeURI(value)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  return (
    <>
      
        <SyncWishlist />
        {/* Only render global Navbar if it's not the homepage */}
        {shouldShowNavbar && <Navbar />}

        {/* Banner (includes its own Navbar) only on home */}
        {isHomePage && <Banner />}

        {/* Breadcrumb on all pages except homepage */}
        {shouldShowBreadcrumb && generateBreadcrumbs()}

        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet />
        </main>

        <Footer />
      
    </>
  );
}

export default App;
