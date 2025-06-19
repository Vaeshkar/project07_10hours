import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import Card from '../components/Card';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const leftContent = (
    <div className='flex justify-end items-top h-full w-full p-4'>
      <h1 className="text-[8rem] font-black uppercase mb-6 text-right max-w-[650px]">
        Profile
      </h1>

    </div>
  );

  const rightContent = (
    <div className='z-10 flex flex-col gap-6 p-4 py-14'>
      <p className='w-full p-3 border bg-white/80 text-left'><strong>Name:</strong> {user?.name || 'Unknown'}</p>
      <p className='w-full p-3 border bg-white/80 text-left'><strong>Email:</strong> {user?.email || 'Unknown'}</p>
      <Link
        to="/profile/edit"
        className="w-full text-black hover:text-white border-2 border-[#6153CC] bg-white/80 hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out p-3"
      >
        Edit Profile
      </Link>
    </div>
  );

  return <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation="rotate-3" />;
}