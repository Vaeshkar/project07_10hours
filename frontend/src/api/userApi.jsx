import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function EditProfile() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { email: formData.email, name: formData.name };
    try {
      const token = localStorage.getItem('token');
      await updateUserProfile(token, updatedData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfile;


export async function updateUserProfile(token, updatedData) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update profile');
  }

  return await response.json();
}
