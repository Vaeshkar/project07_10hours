import './App.css';
import { Outlet, NavLink } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;