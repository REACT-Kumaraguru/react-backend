import {
  FaPenNib,
  FaVideo,
  FaHashtag,
  FaCalendarAlt,
} from "react-icons/fa";

const tabs = [
  { name: "Blogs", icon: FaPenNib },
  // { name: "Videos", icon: FaVideo },
  { name: "Social Media", icon: FaHashtag },
  { name: "Events", icon: FaCalendarAlt },
];

const ExploreTabs = ({ active, setActive }) => {
  return (
    <div className="bg-white shadow-sm sticky top-[64px] z-40 pt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-8 overflow-x-auto py-4">
          {tabs.map(({ name, icon: Icon }) => {
            const isActive = active === name;

            return (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`group relative flex items-center gap-2 px-2 pb-3 text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {/* Icon */}
                <Icon
                  className={`text-base transition-transform duration-300
                  ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />

                {/* Label */}
                <span>{name}</span>

                {/* Animated underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-full rounded-full transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600"
                      : "bg-blue-600 scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreTabs;
