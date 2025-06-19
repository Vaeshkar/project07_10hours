import './App.css';
import { Outlet, NavLink } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* your grid container */}
      <div className="grid grid-cols-5 flex-grow relative">
        {/* Vertical border lines */}
        <div className="absolute col-start-3 col-end-4 border-l border-black h-full z-50"></div>
        <div className="absolute col-start-4 col-end-5 border-l border-black h-full z-50"></div>

        {/* Routed page content */}
        <div className="col-span-5 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;