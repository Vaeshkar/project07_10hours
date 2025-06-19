import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user?.name || 'Unknown'}</p>
      <p><strong>Email:</strong> {user?.email || 'Unknown'}</p>

      <Link
        to="/profile/edit"
        className="inline-block mt-6 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-400"
      >
        Edit Profile
      </Link>
    </div>
  );
}