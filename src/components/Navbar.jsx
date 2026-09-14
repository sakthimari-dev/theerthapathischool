import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.webp";
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Staffs", href: "/staff" },
  { label: "Administration", href: "/administration" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo + School Name */}
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
        <img
  src={logo}
  alt="School Logo"
  className="navbar__logo"
/>
          <span className="navbar__school-name">
            <span className="navbar__school-name-primary">
              THEERTHAPATHI
            </span>
            <span className="navbar__school-name-secondary">
              Higher Secondary School
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar__links" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    isActive ? "navbar__link--active" : undefined
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger (Mobile/Tablet) */}
        <button
          className={`navbar__hamburger ${isOpen ? "is-open" : ""}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="navbar-mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <div
        id="navbar-mobile-menu"
        className={`navbar__mobile-menu ${isOpen ? "is-open" : ""}`}
      >
        <nav aria-label="Mobile Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? "navbar__link--active" : undefined
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="navbar__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}