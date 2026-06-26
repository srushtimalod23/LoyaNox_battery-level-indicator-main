import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function Battery() {
  const [percentage, setPercentage] = useState(0);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    if (!("getBattery" in navigator)) return;

    navigator.getBattery().then((battery) => {
      const updateBattery = () => {
        setPercentage(Math.floor(battery.level * 100));
        setCharging(battery.charging);
      };

      updateBattery();

      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    });
  }, []);

  const getColor = () => {
    if (percentage <= 20) {
      return "from-red-500 to-red-400";
    }
    if (percentage <= 50) {
      return "from-orange-500 to-yellow-500";
    }
    if (percentage <= 80) {
      return "from-yellow-500 to-lime-400";
    }
    return "from-green-500 to-green-300";
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="w-[520px] h-[300px] bg-[#111111] rounded-[30px] flex items-center justify-between px-10 shadow-xl">
        
        {/* Left Section */}
        <div>
          <p className="text-white text-xl mb-3">
            Battery
          </p>

          <h1 className="text-white text-7xl font-bold leading-none">
            {percentage}%
          </h1>

          <div className="flex items-center gap-3 mt-10">
            <p className="text-white text-lg">
              {charging ? "Charging..." : "Not Charging"}
            </p>

            {charging && (
              <Zap
                size={28}
                className="text-lime-400 drop-shadow-[0_0_10px_#84ff00]"
              />
            )}
          </div>
        </div>

        {/* Battery Pill */}
        <div className="relative w-[95px] h-[220px] bg-zinc-700 rounded-[50px] overflow-hidden">
          <div
            className={`absolute bottom-0 left-0 w-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
            style={{
              height: `${percentage}%`,
            }}
          >
            <div className="absolute -top-2 left-0 w-full h-4 rounded-full bg-white/20" />
          </div>
        </div>

      </div>
    </div>
  );
}