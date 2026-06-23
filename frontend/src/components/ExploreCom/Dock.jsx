import { useState } from "react";

const Dock = ({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
}) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="flex items-end justify-center bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl px-3 sm:px-4 py-2 border border-slate-200"
      style={{ height: panelHeight }}
    >
      {items.map((item, index) => {
        const isHovered = hovered === index;
        const isActive = item.active;

        return (
          <button
            key={index}
            onClick={item.onClick}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex flex-col items-center justify-end mx-1 sm:mx-2 focus:outline-none"
          >
            {/* ICON */}
            <div
              className={`
                flex items-center justify-center rounded-xl transition-all duration-300 ease-out
                ${isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}
              `}
              style={{
                width: isHovered ? magnification : baseItemSize,
                height: isHovered ? magnification : baseItemSize,
              }}
            >
              {item.icon}
            </div>

            {/* LABEL */}
            <span
              className={`
                absolute -bottom-6 text-xs font-medium whitespace-nowrap
                transition-all duration-300
                ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                ${isActive ? "text-slate-900" : "text-slate-500"}
              `}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Dock;
