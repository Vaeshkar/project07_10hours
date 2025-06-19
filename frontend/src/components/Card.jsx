export default function Card({ leftContent, rightContent, sideSvgRotation }) {
  return (
    <div className="w-full min-h-[800px] bg-white shadow-2xl overflow-hidden grid grid-cols-5">
      {/* Left group */}
      <div className="col-span-3 relative flex flex-col justify-between p-6">
        {leftContent}
      </div>

      {/* Right group */}
      <div className="col-span-2 relative flex flex-col gap-6 p-8 overflow-hidden">
        {rightContent}
        {/* Example side SVG */}
        {sideSvgRotation && (
          <img
            src="/event_curl_side.svg"
            alt="Side curl"
            className={`absolute -right-12 -top-10 w-[70%] pointer-events-none ${sideSvgRotation}`}
            style={{ objectPosition: "center center" }}
          />
        )}
      </div>
    </div>
  );
};