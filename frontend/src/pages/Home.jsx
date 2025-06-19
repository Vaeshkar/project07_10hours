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
          <Link className='block mb-6' key={event.id} to={`/events/${event.id}`}>
            <div className="p-4 bg-gray-800 shadow hover:bg-gray-900 transition">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <h3 className="text-lg font-semibold">{event.location}</h3>
              <p>{event.description}</p>
              <p className="text-sm text-gray-300">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
