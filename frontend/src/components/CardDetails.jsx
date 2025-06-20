export default function CardDetails({ leftContent, rightContent, sideSvgRotation, snakeSvgRotation }) {
  return (
    <div className="w-full min-h-[800px] bg-white shadow-2xl overflow-hidden grid grid-cols-5 relative">
        {sideSvgRotation && (
          <img
            src="/event_curl_side.svg"
            alt="Side curl"
            className={`absolute top-20 w-[40%] h-140 pointer-events-none ${sideSvgRotation}`}
            style={{ objectPosition: "center center" }}
          />
        )}
      {/* Left group */}
      <div className="col-span-3 flex flex-col justify-end p-6 z-10">
        {leftContent}
      </div>

      {/* Right group */}
      <div className="col-span-2 flex flex-col justify-between p-8 relative z-10 overflow-hidden">
        {rightContent}

        {snakeSvgRotation && (
          <img
            src="/event_curl_snake.svg"
            alt="Snake curl"
            className={`absolute right-6 -top-4 w-[60%] pointer-events-none ${snakeSvgRotation}`}
            style={{ objectPosition: "center center" }}
          />
        )}
      </div>
    </div>
  );
}
