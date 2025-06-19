import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function EditProfile() {
  const { user, updateUser } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { name, email };
      if (password.trim()) updatedData.password = password;

      await updateUser(updatedData);
      addToast('Profile updated successfully!', 'success');
      setPassword('');
      navigate('/profile');
    } catch (err) {
      addToast(`Failed to update profile: ${err.message}`, 'error');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <label className="block mb-4">
        Name:
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="block mb-4">
        Email:
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="block mb-6">
        Password: (leave blank to keep current)
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />
      </label>

      <div className="flex gap-4">
        <button type="submit" className="bg-yellow-300 text-black py-2 px-4 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}