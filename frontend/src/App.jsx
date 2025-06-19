import './App.css';
import { Outlet, NavLink } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className='grid grid-cols-5 relative'>
          {/* Vertical border lines */}
          <div className="absolute col-start-3 col-end-4 border-l border-black h-full z-50"></div>
          <div className="absolute col-start-4 col-end-5 border-l border-black h-full z-50"></div>

          {/* Routed page content */}
          <div className="col-span-5">
            <Header />
            <main className="">
                <Outlet />
            </main>
            <Footer />
          </div>
      </div>
    </>
  );
}

export default App;