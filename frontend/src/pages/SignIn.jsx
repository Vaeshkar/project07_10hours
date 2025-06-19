import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Spinner } from '../components/Spinner';
import Card from '../components/Card';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      addToast('Login successful!', 'success');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      addToast(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const leftContent = (
    <div className="flex justify-end items-start h-full w-full p-4">
      <h1 className="text-[8rem] font-black uppercase mb-6 text-right max-w-[650px]">
        Sign In
      </h1>
    </div>
  );

  const rightContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 py-14 z-10 max-w-md w-full">
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
        className="w-full text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3 cursor-pointer"
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Sign In'}
      </button>
    </form>
  );

  return <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation="rotate-3" />;
}