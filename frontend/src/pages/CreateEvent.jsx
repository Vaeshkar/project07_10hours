import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Spinner } from '../components/Spinner';

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
      // Reset form fields
      setTitle('');
      setLocation('');
      setDate('');
      setDescription('');
      // Redirect to home page or event details
      navigate('/');
    } catch (err) {
      setError(err.message);
      addToast(`Error: ${err.message}`, 'error');
      setLoading
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      {error && <div className="bg-red-600 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 rounded bg-gray-800"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 rounded bg-gray-800"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-800"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          {loading ? <Spinner /> : 'Create Event'}
        </button>
      </form>
    </div>
  );
}