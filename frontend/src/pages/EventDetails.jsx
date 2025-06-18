import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error('Error fetching event details:', err));
  }, [id]);

  if (!event) return <p className="text-white">Loading event details...</p>;

  return (
    <div className="text-white space-y-4">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <h3 className="text-lg font-semibold">{event.location}</h3>
      <p>{event.description}</p>
      <p className="text-sm text-gray-300">
        {new Date(event.date).toLocaleDateString()}
      </p>
    </div>
  );
}
