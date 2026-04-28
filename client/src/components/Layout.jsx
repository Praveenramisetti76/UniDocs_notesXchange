import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/logo.png";

const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar elevation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Browse", icon: "📚" },
    { to: "/upload", label: "Upload", icon: "📤" },
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/30 border-b border-gray-100"
            : "bg-white/60 backdrop-blur-md border-b border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-primary-200/50 ring-2 ring-primary-100 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <img
                  src={logoImg}
                  alt="UniDocs logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                UniDocs
              </span>
            </Link>

            {/* Search Bar — Desktop (only when authenticated) */}
            {isAuthenticated && (
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full group">
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-primary-500"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by subject code..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/80 bg-gray-50/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-300 focus:bg-white transition-all placeholder:text-gray-400"
                  />
                </div>
              </form>
            )}

            {/* Nav Links — Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-primary-50 text-primary-700 shadow-sm shadow-primary-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-500 rounded-full" />
                  )}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200/80">
                  <Link to="/profile" className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-gray-100/80 transition-all group">
                    {user?.profilePhoto ? (
                      <img
                        src={user.profilePhoto.startsWith("http") ? user.profilePhoto : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${user.profilePhoto}`}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-primary-200 transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm transition-transform group-hover:scale-105">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden lg:block group-hover:text-gray-900 transition-colors">
                      {user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200/80">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200/60 hover:shadow-lg hover:shadow-primary-300/40 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-1">
              {/* Mobile search — only when authenticated */}
              {isAuthenticated && (
                <form onSubmit={handleSearch} className="mb-3">
                  <div className="relative">
                    <svg
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by subject code..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </form>
              )}

              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 mt-2 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all"
                    >
                      {user?.profilePhoto ? (
                        <img
                          src={user.profilePhoto.startsWith("http") ? user.profilePhoto : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${user.profilePhoto}`}
                          alt={user?.name}
                          className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-primary-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold text-gray-800 block">{user?.name}</span>
                        <span className="text-xs text-gray-400">View profile</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <Link
                      to="/login"
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 rounded-xl text-sm font-semibold text-center text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-md shadow-primary-200/50 transition-all"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="relative bg-white border-t border-gray-200/60 mt-auto overflow-hidden">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo + tagline */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                  <img src={logoImg} alt="UniDocs logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-base font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  UniDocs
                </span>
              </div>
              <p className="text-xs text-gray-400 text-center md:text-left">
                Share knowledge, ace exams together.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex items-center justify-center gap-8">
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">About</a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Contact</a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} UniDocs — Notes X Change
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
