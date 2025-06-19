import React from "react";

function getRandomRotation() {
  // Randomly returns one of these rotation classes
  const rotations = ["rotate-0", "rotate-12", "-rotate-12", "rotate-6", "-rotate-6"];
  return rotations[Math.floor(Math.random() * rotations.length)];
}

const EventCard = ({ event }) => {
  const sideSvgRotation = getRandomRotation();

  return (
    <div className="w-full min-h-[800px] bg-white shadow-2xl overflow-hidden grid grid-cols-5">
      {/* Left group - spans 3 cols */}
      <div className="col-span-3 relative flex flex-col justify-between p-6">
        {/* Top div with event_curl.svg and event date */}
        <div className="flex items-center space-x-4">
          <img 
            src="/event_curl.svg"
            alt="Event curl"
            className="absolute left-[10%] top-[10%] w-[80%] pointer-events-none z-10"
          />
          <div className="absolute left-[10%] top-[10%] w-[80%] flex items-center justify-center">
            <div className="flex justify-center items-center text-[12.5rem] font-black text-black tracking-tight uppercase">
              {new Date(event.date).getDate()}
            </div>
            <div className="text-[12.5rem] text-black font-black uppercase">
              {new Date(event.date).toLocaleString("en-US", { month: "short" })}
            </div>
          </div>
        </div>

        {/* Bottom div with event_stripe.svg and event title */}
        <div className="flex flex-col items-center justify-start space-x-4">
          <h2 className="text-[4rem] font-black text-black max-w-sm text-left leading-20 mb-15">{event.title}</h2>
          <img
            src="/event_stripe.svg"
            alt="Event stripe"
            className="absolute left-[20%] bottom-[5%] w-[40%] pointer-events-none z-10"
          />
        </div>
      </div>

      {/* Right group - spans 2 cols */}
      <div className="col-span-2 relative flex flex-col gap-6 p-8 overflow-hidden">

        {/* Sub-group 1: event location */}
        <div className="flex-1 flex items-center justify-start z-10">
          <p className="text-xl font-medium text-black">{event.location}</p>
        </div>

        {/* Sub-group 2: share and follow texts */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-2">
          <p className="text-lg text-black font-semibold cursor-pointer hover:text-purple-900 transition-all duration-300">Share</p>
          <p className="text-lg text-black font-semibold cursor-pointer hover:text-purple-900 transition-all duration-300">Follow us</p>
        </div>

        {/* Sub-group 3: event description */}
        <div className="flex overflow-hidden max-w-[380px] z-10">
          <p className="text-4xl text-left text-black text-medium leading-relaxed mb-15">{event.description}</p>
        </div>
        {/* Side SVG pushed outside with rotation */}
        <img
          src="/event_curl_side.svg"
          alt="Side curl"
          className={`absolute -right-12 -top-10 w-[70%] pointer-events-none ${sideSvgRotation}`}
          style={{ objectPosition: "center center" }}
        />
      </div>
    </div>
  );
};

export default EventCard;