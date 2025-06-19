import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function Home() {
  const [events, setEvents] = useState([]);
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${apiUrl}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setEvents(Array.isArray(data.results) ? data.results : []);
      })
      .catch((err) => console.error('Error fetching events:', err));
  }, [apiUrl]);

  return (
    <div className="text-white space-y-4">
      <h2 className="text-2xl font-bold">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>Loading events...</p>
      ) : (
        events.map((event) => (
          <Link className="group block mb-6" key={event.id} to={`/events/${event.id}`}>
            <div className="bg-gray-900 group-hover:bg-yellow-400 rounded p-6 mb-6 group-hover:scale-105 transition-all group-hover:text-black duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold text-white group-hover:text-black mb-2">{event.title}</h2>
              <h3 className="text-gray-300 mb-2 group-hover:text-black">{event.location}</h3>
              <p className="text-gray-300 mb-4 group-hover:text-black">{event.description}</p>
              <p className="text-gray-600 font-semibold">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
