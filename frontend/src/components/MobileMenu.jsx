import React from "react";
import { Link } from "react-router";

export default function MobileMenu({ isOpen, onClose, isAuthenticated, user, handleLogout }) {
  return (
    <div
      className={`fixed inset-0 bg-[#6153CC] text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-6xl font-thin hover:bg-opacity-20 px-4 py-1 transition-colors focus:outline-none"
        aria-label="Close Menu"
      >
        ×
      </button>
      <nav className="flex flex-col items-center justify-center gap-18 h-full text-white text-3xl font-medium">
        <Link to="/" onClick={onClose}>Home</Link>
        <Link to="/create-event" onClick={onClose}>Create Events</Link>
        <Link to="/about" 
          onClick={e => e.preventDefault()}
          tabIndex={-1} // skip tab navigation
          aria-disabled="true">About</Link>
        <Link to="/contact" 
          onClick={e => e.preventDefault()}
          tabIndex={-1} // skip tab navigation
          aria-disabled="true">Contact</Link>
        {!isAuthenticated ? (
          <>
            <div className="flex flex-col items-center mt-8 border-t border-white pt-6 w-4/5 text-center space-y-4">
              <Link to="/signin" onClick={onClose} className="block hover:text-gray-300 transition">Sign In</Link>
              <Link to="/signup" onClick={onClose} className="block hover:text-gray-300 transition">Sign Up</Link>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 border-t border-white pt-6 w-4/5 text-center space-y-4">
              <span className="block text-white font-thin">Welcome, {user?.name?.split(' ')[0] || 'User'}</span>
              <Link to="/profile" onClick={onClose} className="block hover:text-gray-300 transition">Profile</Link>
              <button
                onClick={() => {
                  onClose();
                  handleLogout();
                }}
                className="block hover:text-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}