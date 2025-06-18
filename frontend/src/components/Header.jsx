import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, Link, useNavigate } from 'react-router';
import { useToast } from '../context/ToastContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast('Logout successful!', 'success');
    navigate('/signin');
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link to="/" className='flex items-center text-xl font-bold hover:scale-105 hover:text-yellow-300 hover:fill-yellow-300 transition-all duration-200'>
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-4"
        >
          <rect x="8" y="12" width="48" height="44" rx="6" stroke="white" strokeWidth="4" fill="none" />
          <line x1="16" y1="20" x2="48" y2="20" stroke="white" strokeWidth="4" />
          <circle cx="32" cy="38" r="6" fill="white" />
        </svg>
        <div> Event App</div>
      </Link>
      <nav className="space-x-4 flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-yellow-300 underline' : 'text-white hover:text-yellow-300'
          }
        >
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/create-event"
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 underline' : 'text-white hover:text-yellow-300'
            }
          >
            Create Event
          </NavLink>
        )}
        {!isAuthenticated && (
          <>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? 'text-yellow-300 underline' : 'text-white hover:text-yellow-300'
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? 'text-yellow-300 underline' : 'text-white hover:text-yellow-300'
              }
            >
              Sign Up
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <span className="mr-4">Welcome, {user?.name ? user.name.split(' ')[0] : 'user'}</span>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}