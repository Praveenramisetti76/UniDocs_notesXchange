import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import srmLogo from "../assets/srm-logo.png";

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/features", label: "Features" },
    { to: "/contact", label: "Contact Us" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="public-layout">
      {/* Navbar */}
      <nav className={`public-nav ${scrolled ? "public-nav--scrolled" : ""}`}>
        <div className="public-nav__inner">
          {/* Logo */}
          <Link to="/" className="public-nav__logo">
            <div className="public-nav__logo-img-wrap">
              <img src={srmLogo} alt="SRM University AP" className="public-nav__logo-img" />
            </div>
            <div className="public-nav__logo-text">
              <span className="public-nav__brand">UniDocs</span>
              <span className="public-nav__tagline">SRM University AP</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="public-nav__links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`public-nav__link ${isActive(link.to) ? "public-nav__link--active" : ""}`}
              >
                {link.label}
                {isActive(link.to) && <span className="public-nav__link-indicator" />}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="public-nav__auth">
            <Link to="/login" className="public-nav__login-btn">
              Log In
            </Link>
            <Link to="/register" className="public-nav__signup-btn">
              Sign Up Free
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="public-nav__hamburger"
            aria-label="Toggle menu"
          >
            <span className={`public-nav__bar ${mobileOpen ? "public-nav__bar--open-1" : ""}`} />
            <span className={`public-nav__bar ${mobileOpen ? "public-nav__bar--open-2" : ""}`} />
            <span className={`public-nav__bar ${mobileOpen ? "public-nav__bar--open-3" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`public-nav__mobile ${mobileOpen ? "public-nav__mobile--open" : ""}`}>
          <div className="public-nav__mobile-inner">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`public-nav__mobile-link ${isActive(link.to) ? "public-nav__mobile-link--active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="public-nav__mobile-auth">
              <Link to="/login" className="public-nav__mobile-login">Log In</Link>
              <Link to="/register" className="public-nav__mobile-signup">Sign Up Free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="public-footer">
        <div className="public-footer__glow" />
        <div className="public-footer__inner">
          <div className="public-footer__top">
            <div className="public-footer__brand-col">
              <div className="public-footer__brand">
                <img src={srmLogo} alt="SRM" className="public-footer__brand-img" />
                <div>
                  <span className="public-footer__brand-name">UniDocs</span>
                  <span className="public-footer__brand-sub">Notes X Change — SRM AP</span>
                </div>
              </div>
              <p className="public-footer__desc">
                The official student notes exchange platform for SRM University AP. Share knowledge, ace your exams, build community.
              </p>
            </div>

            <div className="public-footer__links-col">
              <h4 className="public-footer__col-title">Quick Links</h4>
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="public-footer__link">{link.label}</Link>
              ))}
            </div>

            <div className="public-footer__links-col">
              <h4 className="public-footer__col-title">Get Started</h4>
              <Link to="/login" className="public-footer__link">Log In</Link>
              <Link to="/register" className="public-footer__link">Create Account</Link>
            </div>

            <div className="public-footer__links-col">
              <h4 className="public-footer__col-title">Connect</h4>
              <a href="https://srmap.edu.in" target="_blank" rel="noreferrer" className="public-footer__link">
                SRM AP Website
              </a>
              <a href="mailto:praveen_ramisetti@srmap.edu.in" className="public-footer__link">Email Us</a>
            </div>
          </div>

          <div className="public-footer__bottom">
            <p>© {new Date().getFullYear()} UniDocs — SRM University AP, Andhra Pradesh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
