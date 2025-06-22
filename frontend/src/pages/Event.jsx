import Card from "../components/Card";
import Magnet from '../components/Magnet'

function getRandomRotation() {
  const rotations = ["rotate-0", "rotate-12", "-rotate-12", "rotate-6", "-rotate-6"];
  return rotations[Math.floor(Math.random() * rotations.length)];
}

export default function Event({ event }) {
  const sideSvgRotation = getRandomRotation();
  
  const leftContent = (
    <>
      <div className="flex items-center space-x-4">
        <img 
          src="/event_curl.svg"
          alt="Event curl"
          className="absolute left-[6%] top-[10%] w-[90%] pointer-events-none z-10"
        />
        <div className="absolute left-[10%] top-[10%] w-[80%] flex items-center justify-center gap-12">
          <div className="flex justify-center items-center text-[12.5rem] font-black text-black tracking-tight uppercase">
            {new Date(event.date).getDate()}
          </div>{' '}
          <div className="text-[12.5rem] text-black font-black uppercase">
            {new Date(event.date).toLocaleString("en-US", { month: "short" })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start space-x-4">
        <h2 className="text-[4rem] font-black text-black max-w-sm text-left leading-20 mb-15">{event.title}</h2>
        <img
          src="/event_stripe.svg"
          alt="Event stripe"
          className="absolute left-[20%] bottom-[5%] w-[40%] pointer-events-none z-10"
        />
      </div>
    </>
  );

  const rightContent = (
    <>
      <div className="flex-1 flex items-center justify-start z-10">
        <p className="text-xl font-medium text-black">{event.location}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-start space-y-2">
          <p className="text-lg font-medium hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out -mt-14 cursor-pointer">Share</p>
          <p className="text-lg font-medium hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out -mt-2 cursor-pointer">Follow us</p>
        </div>

      <div className="flex overflow-hidden max-w-[380px] z-10">
        <p className="text-4xl text-left text-black text-medium leading-relaxed mb-15">{event.description}</p>
      </div>
    </>
  );

  return <Magnet
          wrapperClassName="relative w-full h-full"
          padding={20}
          magnetStrength={15}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <Card leftContent={leftContent} rightContent={rightContent} sideSvgRotation={sideSvgRotation} />
        </Magnet>
};