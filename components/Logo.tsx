export default function Logo() {
  return (
    <div className="flex items-center gap-2">

      {/* Icon */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-black to-gray-600 flex items-center justify-center">
        <span className="text-white font-semibold text-sm tracking-tight">
          ST
        </span>
      </div>

      {/* Text */}
      <span className="font-semibold text-lg tracking-tight">
        SubTrack
      </span>

    </div>
  );
}