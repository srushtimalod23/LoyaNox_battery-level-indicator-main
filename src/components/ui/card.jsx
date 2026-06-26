import { useEffect, useState } from "react";

import { BatteryCharging } from "lucide-react";

export default function BatteryLevel() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (percent < 30) return "bg-red-500";
    if (percent < 70) return "bg-orange-500";
    return "bg-green-500";
  };

  const glow =
    percent < 30
      ? "shadow-[0_0_25px_rgba(255,0,0,0.6)]"
      : percent < 70
      ? "shadow-[0_0_25px_rgba(255,165,0,0.6)]"
      : "shadow-[0_0_25px_rgba(0,255,0,0.6)]";

  return (
    <div className="h-screen grid place-items-center bg-[#1c1c1c] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[300px] h-[300px] bg-green-500/10 rounded-full blur-3xl animate-pulse" />

     <div className="p-6 flex flex-col items-center gap-4 z-10">
        {/* icon */}
        <BatteryCharging className="w-8 h-8 animate-pulse" />

        {/* battery */}
        <div className={`relative w-[200px] h-[90px] border-4 border-white rounded-lg overflow-hidden ${glow}`}>
          
          <div
            className={`h-full transition-all duration-500 ${getColor()} relative`}
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* text */}
        <h2 className="text-xl">
          {percent}% Charging
        </h2>

      </div>
    </div>
  );
}