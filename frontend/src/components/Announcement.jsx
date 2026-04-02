import { useState } from "react";
import { ChevronDown } from "lucide-react";

const announcements = [
  {
    title: "REACT Student Fellow 2025 Cohort Application closed",
    status: "Closed",
    color: "bg-gray-200 text-gray-700",
    content:
      "A six-month, credit-aligned fellowship that turns classrooms into real-world labs. Fellows live the problem, apply REACT tools like PULSE and Infinity WHY, and develop validated, impact-ready solutions showcased on Demo Day.",
  },
  {
    title: "REACT GLOBE Fellowship — Ongoing (Closes in 10 Days)",
    status: "Open Now",
    color: "bg-green-100 text-green-700",
    content:
      "An immersive 6–12 month leadership fellowship working in India on real-world challenges. Fellows drive systems change, build ecosystems, and create global solutions through masterclasses, field immersion, and mentorship.",
  },
  {
    title: "REACT Volunteering Fellow — Opening Soon",
    status: "Opening Soon",
    color: "bg-yellow-100 text-yellow-700",
    content:
      "The volunteering fellowship will open shortly. Stay tuned for application details.",
  },
  {
    title: "REACT Citizen Fellow — Opening Soon",
    status: "Opening Soon",
    color: "bg-yellow-100 text-yellow-700",
    content:
      "The Citizen Fellowship is launching soon. Follow our channels for updates.",
  },
];

export default function Announcement() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    /* Added pt-28 to ensure content starts well below a fixed navbar */
    <section className="bg-white w-full px-6 pt-28 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Announcements
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with the latest information about the REACT Fellowship Program
          </p>
        </div>

        {/* Announcement List */}
        <div className="space-y-4">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-200 hover:border-gray-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <p className="font-semibold text-gray-900 text-lg">
                    {item.title}
                  </p>
                  <span
                    className={`text-xs w-fit px-3 py-1 rounded-full font-bold uppercase tracking-wider ${item.color}`}
                  >
                    {item.status}
                  </span>
                </div>

                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-700 text-base border-t border-gray-50 pt-4">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Reminders */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Important Reminders
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Follow our social media channels for real-time updates
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>All deadlines are based on <span className="font-semibold text-blue-900">IST</span></span>
            </li>
            <li className="flex items-start gap-2 md:col-span-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                For any queries regarding the program, contact{" "}
                <a href="mailto:react@kct.ac.in" className="font-semibold text-blue-700 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-500 transition-all">
                  react@kct.ac.in
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}