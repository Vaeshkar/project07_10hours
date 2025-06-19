import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Spinner } from '../components/Spinner';
import Card from "../components/Card";

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/events', { title, location, date, description });
      addToast('Event created successfully!');
      console.log('Event created:', res.data);
      setTitle('');
      setLocation('');
      setDate('');
      setDescription('');
      navigate('/');
    } catch (err) {
      setError(err.message);
      addToast(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const leftContent = (
    <div className="text-black p-4">
      <h2 className="text-[8rem] font-black uppercase mb-6 text-right max-w-[650px]">Create New Event</h2>
      {error && <div className="bg-red-600 p-2 rounded mb-4">{error}</div>}
    </div>
  );

  const rightContent = (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 py-14 z-10">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 border bg-white/80"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location, e.g. New York, NY, USA"
        className="w-full p-3 border bg-white/80"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="date"
        className="w-full p-3 border bg-white/80"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-3 border bg-white/80"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3 flex justify-center cursor-pointer"
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Create Event'}
      </button>
    </form>
  );

  return <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation="rotate-0" />;
}