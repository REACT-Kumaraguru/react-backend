import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ExploreHero from "../components/ExploreCom/ExploreHero";
import ExploreTabs from "../components/ExploreCom/ExploreTabs";
import ExploreSection from "../components/ExploreCom/ExploreSection";
// import VideoSection from "../components/ExploreCom/VideoSection";
import SocialMedia from "../components/ExploreCom/SocialMedia";



/* ------------------ BLOG DATA ------------------ */
const data = [

  {
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    tag: "Systems Thinking",
    title: "When Problems Refuse to Stay Simple",
    desc: `At REACT Studio, we don't begin with solutions. We begin with questions. During an immersion at Senjolai, one of our student teams noticed what seemed like a straightforward problem: "Grains spoil because the air is damp." But simple answers rarely tell the whole story. Each answer revealed not one cause, but a system of causes: climate pressures, infrastructure gaps, economic barriers, and local practices all woven together in daily life. Students are trained not to rush toward fixes but to see problems as systems, mapping connections, gathering evidence, and grounding insights in lived realities.`,
    author: 'REACT',
    date: "Feb , 2026",
    link: "https://www.linkedin.com/pulse/when-problems-refuse-stay-simple-react-ki-7nhtc"
  },

  {
    image:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=600",
    tag: "Ideation",
    title: "When Students Are in the Cloud",
    desc: `Every REACT cohort reaches this point. The fieldwork is done. The reflections are mapped. The questions are sharp. And yet, the room feels lighter. The students are in the cloud — the phase between clarity and creation, when ideas exist but haven't landed. It's not confusion. It's creation in its rawest form. At REACT, this phase is treated as the necessary turbulence before systems stabilize. Because building a product isn't about locking a concept too early; it's about learning the conditions under which it can sustain itself.`,
    author: 'REACT',
    date: "Feb , 2026",
    link: "https://www.linkedin.com/pulse/when-students-cloud-react-ki-jlwuc"
  },

  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    tag: "Fellowship",
    title: "From Connection to Creation: Fellows in their Ideation Phase",
    desc: `In the Solution Ideation phase, every REACT Fellow stands at an in-between space — between what they've understood and what they hope to create. Senjolai, an organic farming and training centre in Sulur, becomes an inspiration. Its economy is not outside the ecology — it grows within it. Compost, seed, and soil form one continuous cycle of production. For Fellows, this becomes both lesson and reassurance: find where your idea belongs — the point where it strengthens, not disrupts, the system it enters.`,
    author: 'REACT',
    date: "Feb , 2026",
    link: "https://www.linkedin.com/pulse/from-connection-creation-fellows-ideation-phase-react-ki-ehgrc"
  },

  {
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
    tag: "Sustainability",
    title: "Nilgiri Tahr Day: Learning from Systems that Sustain",
    desc: `October in Tamil Nadu marks a quiet but significant moment — Nilgiri Tahr Day. It's a celebration of a species, but also a recognition of how fragile and interconnected mountain ecosystems truly are. At REACT Studio, systems-level understanding is the foundation. Our fellows don't study problems as isolated events. They enter communities, listen, document, and trace how one small change influences a larger web. Nilgiri Tahr Day reminds us that survival is a collaborative act — not just for species, but for systems of learning and innovation.`,
    author: 'REACT',
    date: "Jan , 2026",
    link: "https://www.linkedin.com/pulse/nilgiri-tahr-day-learning-from-systems-sustain-react-ki-ba8ic"
  },

  {
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQGix88OrqFCMg/article-cover_image-shrink_720_1280/B56Zn4v9_SJYAM-/0/1760814948780?e=1773273600&v=beta&t=hHco3nrSvboDpyG716yDnBuvF9-HRmGbD4TVqgZP_yA",
    tag: "",
    title: "REACT has begun - and it's already reacting.",
    desc: `We are thrilled to launch REACT – Real-world Engineering and Application Through Collaborative Transformation, a flagship initiative by Kumaraguru Institutions that empowers students to step beyond traditional classrooms and into the heart of real-world learning. Day 1 saw students reflecting on their expectations, understanding the deeper vision of REACT, and immersing themselves in a journey of meaningful transformation. This is not just a program. It is an invitation — to explore, reflect, co-create, and implement solutions alongside mentors, changemakers, and field partners.`,
    author: '',
    date: "Aug , 2025",
  },

  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
    tag: "",
    title: "Solution Ideation Phase",
    desc: `In the Solution Ideation phase, REACT Fellows are navigating a critical space — between understanding a problem deeply and shaping a solution that truly fits. Immersion sites like Senjolai offer powerful lessons. Here, sustainable enterprises grow organically, rooted in ecological balance and community involvement. Our Fellows are learning to approach ideation the same way: not by forcing solutions, but by discovering where their ideas can add real and lasting value.`,
    author: "",
    date: "Nov , 2025",
  },

];

/* ------------------ EVENTS DATA ------------------ */
const events = [
  {
    title: "Inauguration ceremony",
    date: "January 12, 2026",
    time: "9:30 AM",
    location: "Sir CV Raman Hall, Kumaraguru Institutions",
    desc: "Inauguration ceremony of the REACT initiative (Real-world Engineering and Application Through Collaborative Transformation). Topic: Research Essentials and Opportunities. The program focuses on empowering learners to solve real challenges with real impact, featuring Dr. Balasubramanian Venkataraman as the Chief Guest.",
    status: "past",
  },
  {
    title: "Hackathon problem compendium",
    date: "March 9-14, 2026",
    time: "9:30 AM - 10.00 PM",
    location: "Library, Kumaraguru Institutions, Coimbatore",
    desc: "The hackathon problem compendium is a collection of real-world problems that are relevant to the REACT initiative (Real-world Engineering and Application Through Collaborative Transformation). The program focuses on empowering learners to solve real challenges with real impact, featuring Dr. Balasubramanian Venkataraman as the Chief Guest.",
    status: "upcoming",
  }

];

/* ------------------ EVENTS SECTION ------------------ */
const EventsSection = () => {
  const [tab, setTab] = useState("Upcoming");
  const navigate = useNavigate();

  const filteredEvents =
    tab === "Upcoming"
      ? events.filter((e) => e.status === "upcoming")
      : events.filter((e) => e.status === "past");

  return (
    <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">
          REACT Fellowship Events
        </h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
          Join us for a series of events designed to enhance your understanding of responsible AI in healthcare and maximize your fellowship experience.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setTab("Upcoming")}
            className={`px-6 py-2 text-sm font-medium rounded-md transition
              ${tab === "Upcoming"
                ? "bg-black text-white"
                : "text-slate-600 hover:bg-white"
              }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setTab("Past")}
            className={`px-6 py-2 text-sm font-medium rounded-md transition
              ${tab === "Past"
                ? "bg-black text-white"
                : "text-slate-600 hover:bg-white"
              }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Title + Badge */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg text-slate-900">
                {event.title}
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                Upcoming
              </span>
            </div>

            {/* Meta */}
            <div className="space-y-2 text-sm text-slate-600 mb-4">
              <p> {event.date}</p>
              <p> {event.time}</p>
              <p> {event.location}</p>
            </div>

            {/* Description */}
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {event.desc}
            </p>

            {/* Action */}
            {event.title.toLowerCase().includes("hackathon") && (
              <button
                onClick={() => navigate("/solve4purpose/problems")}
                className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-slate-800 transition mt-2"
              >
                View Problem Statements →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------ MAIN PAGE ------------------ */
const ExploreUs = () => {
  const location = useLocation();
  const [active, setActive] = useState("Blogs");

  // 🔁 Auto-switch to Events when coming from "More Events"
  useEffect(() => {
    if (location.state?.section) {
      setActive(location.state.section);
    }
  }, [location.state]);



  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24">

      <ExploreHero />

      <div className="max-w-7xl mx-auto px-6 pb-32">

        {/* Tabs */}
        <ExploreTabs active={active} setActive={setActive} />

        {/* Section Header */}
        <div className="mt-12 mb-10">
          <h2 className="text-3xl font-bold text-[#0F172A] border-b-4 border-[#059669] inline-block pb-2">
            {active === "Blogs" ? "Academic Insights" : active}
          </h2>
        </div>

        <main className="transition-all duration-500">
          {active === "Blogs" && <ExploreSection items={data} />}
          {active === "Videos" && <VideoSection />}
          {active === "Social Media" && <SocialMedia />}
          {active === "Events" && <EventsSection />}
        </main>
      </div>


    </div>
  );
};

export default ExploreUs;
