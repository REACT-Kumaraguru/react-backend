"use client";
import { Link } from "react-router-dom";   // ✅ Import Link

const Events = () => {
  const events = [
    {
      id: 1,
      title: "REACT Fellowship Orientation",
      date: "November 1, 2025",
    },
    {
      id: 2,
      title: "REACT Problem to Idea Mapping",
      date: "October 21, 2025",
    },
    {
      id: 3,
      title: "REACT Fellows Meet",
      date: "November 3, 2025",
    },
  ];

  return (
    <div className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* EVENTS */}
        <div>
          <h2 className="text-3xl font-bold mb-3">Events</h2>
          <p className="text-gray-600 mb-8">
            The Buzzing Zone relaying essentials of wide range of activities organised throughout the year.
          </p>

          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="flex items-start gap-4">
                
                {/* Blue Line */}
                <div className="w-1 h-12 bg-blue-600 rounded-sm"></div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-10">
            <Link to="/explore-us" state={{ section: "Events" }}>
              <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                More Events
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Events;
