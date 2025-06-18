import './App.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <header className="p-4 bg-gray-800 text-white text-xl">Event App</header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
