import Orb from '../components/Orb';

export default function NotFound() {
  return (
    <div className="relative w-full h-full">
      <div style={{ width: '100%', height: '600px', position: 'absolute', top: '-150px', left: '0' }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <div className="text-center text-white mt-40">
        <h1 className="text-[8rem] font-black uppercase">404</h1>
        <p className="text-2xl mt-4">Page not found</p>
      </div>
    </div>
  );
}