import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import CardDetails from '../components/CardDetails';
import DecryptedText from '../components/DecryptedText';
import Magnet from '../components/Magnet'
import { motion, AnimatePresence } from "framer-motion";

export default function EventDetails(){
  const { id } = useParams();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Fetch event details by ID
  useEffect(() => {
    fetch(`${apiUrl}/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          navigate('/404'); 
        } else {
          setEvent(data);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/404');
      });
  }, [id]);

  // Fetch all events for navigation
  useEffect(() => {
    fetch(`${apiUrl}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data.results)) 
      .catch((err) => console.error(err));
  }, []);

  // Handle keyboard navigation for next/previous events
  useEffect(() => {
    function keypressEventListener(e) {
      const currentIndex = events.findIndex((ev) => ev.id === parseInt(id));
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setDirection(-1);
        navigate(`/events/${events[currentIndex - 1].id}`);
      }
      if (e.key === 'ArrowRight' && currentIndex < events.length - 1) {
        setDirection(1);
        navigate(`/events/${events[currentIndex + 1].id}`);
      }
    }

    window.addEventListener('keydown', keypressEventListener);
    return () => {
      window.removeEventListener('keydown', keypressEventListener);
    };
  }, [events, id, navigate]);

  if (!event) return <p>Loading event...</p>;

  const currentIndex = events.findIndex((e) => e.id === parseInt(id));
  const prevEvent = events[currentIndex - 1];
  const nextEvent = events[currentIndex + 1];

  const leftContent = (
    <div className="flex flex-col text-black p-4 h-full justify-between items-end">
      <p className="font-black text-5xl uppercase text-right mt-12">{new Date(event.date).getDate()}{' '}{new Date(event.date).toLocaleString("en-US", { month: "short" })}</p>
      <h1 className="text-[7rem] leading-26 font-black uppercase text-right">
        {event.title}
      </h1>

    </div>
  );

  const rightContent = (
    <div className="w-full h-full mx-auto z-10 py-4">
      <div className="p-4 text-black mt-4 flex flex-col gap-4 h-full">
        <div className="flex-1 flex flex-col justify-center items-start space-y-2">
          <p className="text-lg font-medium hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out -mt-14 cursor-pointer">Share</p>
          <p className="text-lg font-medium hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out -mt-2 cursor-pointer">Follow us</p>
        </div>
        
        <div className="flex-1 flex-col items-center justify-start z-10 mt-60">
          {event.location && (() => {
            const parts = event.location.split(',').map(part => part.trim());
            return (
              <>
                <p className='text-xl font-medium text-black text-left'>
                  {parts[0]}, </p>
                <p className='text-xl font-medium text-black text-left'>
                  {[parts[1], parts[2]].filter(Boolean).join(', ')}</p>
              </>
            );
          })()}
        </div>
        <div>
          <p className="font-black text-5xl text-left">{event.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="text-black space-y-4">
        <h2 className="text-[5rem] text-white font-black uppercase -mt-24 mb-1 text-center">
          <DecryptedText 
          text={`EVENT DETAILS ${currentIndex + 1}/${events.length}`}
          speed={120}
          maxIterations={20}
          characters="WBS BESSLAN"
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          animateOn='hover'
          />
        </h2>
      </div>
      {/* Magnet effect for the card */}
      <Magnet
        wrapperClassName="relative w-full h-full"
        padding={20}
        magnetStrength={15}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
      >
        <div className="slider_wrapper w-full">
          <AnimatePresence mode='wait'>
            <motion.div
              key={event.id}
              initial={{ x: direction * screenWidth, skewX: direction * 10 }}
              animate={{ x: 0, skewX: 0 }}
              exit={{ x: direction * -screenWidth, skewX: direction * -10 }}
              transition={{
                x: { type: "tween", stiffness: 200, damping: 20, duration: 0.3 },
                skewX: { type: "spring", duration: 0.2 }
              }}
            >
              <CardDetails
                sideSvgRotation
                leftContent={leftContent}
                rightContent={rightContent}
                snakeSvgRotation="rotate-[-8deg]" />
            </motion.div>
          </AnimatePresence>
        </div>
      <div className="flex justify-between gap-12 px-8 mt-8 z-20">
        {/* Navigation, Back, Delete buttons */}
            <button
              onClick={() => {prevEvent && navigate(`/events/${prevEvent.id}`); setDirection(-1);}}
              disabled={!prevEvent}
              className={`px-6 py-3
                ${prevEvent
                  ? 'text-black hover:text-white border border-[#6153CC] hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out cursor-pointer'
                  : 'text-black/20 border border-[#6153CC] cursor-not-allowed'}`}
            >
              ←
            </button>
            <div className='flex items-center gap-12'>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 text-black hover:text-white border border-[#6153CC] hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out cursor-pointer min-w-[16rem]"
              >
                Back
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-3 text-black hover:text-white border border-red-600 hover:bg-red-600 hover:scale-95 transition-all duration-400 ease-out cursor-pointer min-w-[16rem]"
              >
                Delete Event
              </button>

            </div>

            <button
              onClick={() => {nextEvent && navigate(`/events/${nextEvent.id}`); setDirection(1);}}
              disabled={!nextEvent}
              className={`px-6 py-3
                ${nextEvent
                  ? 'text-black hover:text-white border border-[#6153CC] hover:bg-[#6153CC] hover:scale-95 transition-all duration-400 ease-out cursor-pointer'
                  : 'text-black/20 border border-[#6153CC] cursor-not-allowed'}`}
            >
              →
            </button>
          </div>
      </Magnet>
    </>
  );
}