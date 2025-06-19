import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Spinner } from '../components/Spinner';
import Card from '../components/Card';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/users', { email, password });
      console.log('Signup response:', res.data);
      addToast('Signup successful!', 'success');
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
      addToast(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const leftContent = (
    <div className="flex justify-end items-start h-full w-full p-4">
      <h1 className="text-[8rem] font-black uppercase mb-6 text-right max-w-[650px]">
        Sign Up
      </h1>
    </div>
  );

  const rightContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 py-14 max-w-md w-full z-10">
      {error && <div className="bg-red-600 text-white p-2 rounded">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border bg-white/80 text-left"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border bg-white/80 text-left"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full text-white bg-[#6153CC] hover:bg-black hover:scale-95 transition-all duration-400 ease-out p-3 cursor-pointer"
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Sign Up'}
      </button>
    </form>
  );

  return <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation="rotate-3" />;
}