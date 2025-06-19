import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import Card from '../components/Card';

export default function EventDetails() {
  const { id } = useParams();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleDelete = async () => {
  if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
    try {
      const response = await fetch(`${apiUrl}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // adjust if token stored elsewhere
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      addToast('Event deleted successfully!', 'success');
      navigate('/');
    } catch (error) {
      addToast(`Failed to delete event: ${error.message}`, 'error');
    }
  }
};

  useEffect(() => {
    fetch(`${apiUrl}/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`${apiUrl}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data.results)) // adjust if needed
      .catch((err) => console.error(err));
  }, []);

  if (!event) return <p>Loading event...</p>;

  const currentIndex = events.findIndex((e) => e.id === parseInt(id));
  const prevEvent = events[currentIndex - 1];
  const nextEvent = events[currentIndex + 1];

  const leftContent = (
    <>
      <div className="text-black p-4">
        <h1 className="text-[8rem] font-black uppercase mb-6 text-right max-w-[650px]">
          Event Details
        </h1>
      </div>
    </>
  );

  const rightContent = (
    <div className="w-full mx-auto text-black z-10 p-4 py-14">
      <button
        onClick={() => navigate('/')}
        className="w-full text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3 cursor-pointer"
      >
        Back
      </button>

      <div className="min-h-[50vh] p-6 text-white bg-[#6153CC]/90 mt-4">
        <h3 className="text-[3.5rem] leading-15 uppercase font-black mb-6">{event.title}</h3>
        <p className="mb-4 font-medium text-2xl">{event.description}</p>
        <p className="font-black text-5xl">{new Date(event.date).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={() => prevEvent && navigate(`/events/${prevEvent.id}`)}
          disabled={!prevEvent}
          className={`px-4 py-2
            ${prevEvent
              ? 'w-1/2 text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3 cursor-pointer'
              : 'w-1/2 bg-white/80 text-black/20 border-1 border-[#6153CC] cursor-not-allowed'}`}
        >
          ←
        </button>

        <button
          onClick={() => nextEvent && navigate(`/events/${nextEvent.id}`)}
          disabled={!nextEvent}
          className={`px-4 py-2
            ${nextEvent
              ? 'w-1/2 text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3 cursor-pointer'
              : 'w-1/2 bg-white/80 text-black/20 border-1 border-[#6153CC] cursor-not-allowed'}`}
        >
          →
        </button>
      </div>
      <button
        onClick={handleDelete}
        className="w-full text-black hover:text-white border-2 border-red-600 bg-white/80 hover:bg-red-600 hover:scale-95 transition-all duration-400 ease-out p-3 cursor-pointer mt-4"
      >
        Delete Event
      </button>
    </div>
  );

  return <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation="rotate-[-15deg]" />;
}