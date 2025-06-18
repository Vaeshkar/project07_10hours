import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router';
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
      <div>Event App</div>
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