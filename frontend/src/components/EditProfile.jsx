import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Card from './Card';

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

  const leftContent = (
    <div className="text-black p-4">
      <h1 className="text-[8rem] font-black uppercase mb-6 text-right max-w-[650px]">Edit Profile</h1>
    </div>
  );

  const rightContent = (
    <form onSubmit={handleSubmit} className="w-full space-y-6 p-4 py-14 z-10">
      <label className="block mb-4 text-left">
        Name:
        <input
          type="text"
          className="w-full p-3 border bg-white/80 text-left mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="block mb-4 text-left">
        Email:
        <input
          type="email"
          className="w-full p-3 border bg-white/80 text-left mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="block mb-6 text-left">
        Password:
        <input
          type="password"
          className="w-full p-3 border bg-white/80 text-left mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="leave blank to keep current"
        />
      </label>

      <div className="flex gap-4">
        <button type="submit" className="w-full text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-2/5 text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation="rotate-[-15deg]" />;
}