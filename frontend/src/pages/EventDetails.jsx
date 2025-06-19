import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${apiUrl}/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`${apiUrl}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data.results)) // or adjust based on your API response structure
      .catch((err) => console.error(err));
  }, []);

  if (!event) return <p>Loading event...</p>;

  // Find current event index
  const currentIndex = events.findIndex((e) => e.id === parseInt(id));
  const prevEvent = events[currentIndex - 1];
  const nextEvent = events[currentIndex + 1];

  return (
  <div className="max-w-xl mx-auto p-4">
    <button
      onClick={() => navigate('/')}
      className="mb-6 px-4 py-2 bg-gray-900 text-white hover:bg-yellow-500 hover:text-black rounded shadow transition-colors duration-300"
    >
    Back
    </button>

    <div className="bg-gray-900 rounded p-6 mb-6">
      <h3 className="text-3xl font-semibold text-white mb-6">{event.title}</h3>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <p className="text-gray-600 font-semibold">{new Date(event.date).toLocaleDateString()}</p>
    </div>
    <div className="flex justify-between">
      <button
        onClick={() => prevEvent && navigate(`/events/${prevEvent.id}`)}
        disabled={!prevEvent}
        className={`px-4 py-2 rounded shadow font-semibold
          ${prevEvent
            ? 'bg-gray-900 hover:bg-yellow-500 text-white hover:text-black transition-colors duration-300'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
      ←
      </button>

      <button
        onClick={() => nextEvent && navigate(`/events/${nextEvent.id}`)}
        disabled={!nextEvent}
        className={`px-4 py-2 rounded shadow font-semibold
          ${nextEvent
            ? 'bg-gray-900 hover:bg-yellow-500 text-white hover:text-black transition-colors duration-300'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
      →
      </button>
    </div>
  </div>
);
}