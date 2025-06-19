import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import EventCard from "../components/EventCard";

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
    <div className="text-black space-y-4">
    <h2 className="text-[8rem] text-[#6153CC] font-black uppercase mt-4">Upcoming Events</h2>
    {events.length === 0 ? (
      <p>Loading events...</p>
    ) : (
      <div className="space-y-24">
        {events.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`} className="block hover:scale-98 transition-all duration-600 ease-out">
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    )}
  </div>
  );
}
