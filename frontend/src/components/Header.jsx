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
    <header className=" bg-white text-black shadow-2xl">
      <div className="grid grid-cols-5 items-center min-h-[180px]">
        {/* Logo spans 2 columns */}
        <Link to="/" className='group col-span-2 flex h-full items-center justify-center text-xl font-bold hover:scale-95 transition-transform duration-600 ease-out'>
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-4 "
        >
          <rect x="8" y="12" width="48" height="44" rx="6" stroke="black" strokeWidth="4" fill="none" className='' />
          <line x1="16" y1="20" x2="48" y2="20" stroke="black" strokeWidth="4" className='' />
          <circle cx="32" cy="38" r="6" fill="black" className='' />
        </svg>
        <div className='roboto-condensed-black text-3xl tracking-widest pt-1 -ml-2'>EVENT</div>
      </Link>
      
        {/* Group 1 */}
        <nav className="flex flex-col h-full items-start justify-center border-l border-black px-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-text-purple-800 underline' : 'text-black hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400 ease-out'
            }
          >
            Home
          </NavLink>
          <NavLink
              to={isAuthenticated ? "/create-event" : "#"}
              className={({ isActive }) =>
                (isAuthenticated
                  ? (isActive ? 'text-text-purple-700 underline' : 'text-black hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400')
                  : 'text-gray-400 cursor-not-allowed') // disabled styles
              }
              onClick={e => {
                if (!isAuthenticated) e.preventDefault(); // prevent navigation if not logged in
              }}
              tabIndex={isAuthenticated ? 0 : -1} // make unfocusable when disabled
              aria-disabled={!isAuthenticated} // accessibility
            >
              Create Event
          </NavLink>
        </nav>

        {/* Group 2 */}
        <nav className="flex flex-col h-full items-start justify-center border-l border-black px-10">
          <NavLink
          to="/About"
          // Placeholder link for "About" section
          onClick={e => e.preventDefault()}
          tabIndex={-1} // skip tab navigation
          aria-disabled="true"
          className={({ isActive }) =>
            isActive ? 'text-text-purple-800 underline' : 'text-black hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400 ease-out cursor-not-allowed'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/Contact"
          // Placeholder link for "Contact" section
          onClick={e => e.preventDefault()}
          tabIndex={-1} // skip tab navigation
          aria-disabled="true"
          className={({ isActive }) =>
            isActive ? 'text-text-purple-800 underline' : 'text-black hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400 ease-out cursor-not-allowed'
          }
        >
          Contact
        </NavLink>
        </nav>

        {/* Group 3: Show Sign In/Up if NOT authenticated; else Profile + Logout */}
        <nav className="flex flex-col h-full items-start justify-center border-l border-black px-10">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? 'text-text-purple-800 underline' : 'text-black font-medium hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400 ease-out'
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'text-text-purple-800 underline' : 'text-black hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400 ease-out'
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="mr-4 text-purple-800">Welcome, {user?.name ? user.name.split(' ')[0] : 'user'}</span>
              <div className='flex items-center gap-2'>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? 'text-text-purple-800 underline' : 'text-black hover:text-[#6153CC] underline-[#6153CC] hover:underline transition-all duration-400 ease-out'
                  }
                >
                  Profile
                </NavLink>
                <span className="text-black">|</span>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-[#6153CC]  focus:outline-none hover:underline underline-[#6153CC] transition-all duration-400 ease-out cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
{/* <span className="mr-4">Welcome, {user?.name ? user.name.split(' ')[0] : 'user'}</span> */}