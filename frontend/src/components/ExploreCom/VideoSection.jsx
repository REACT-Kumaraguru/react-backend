import { FaYoutube, FaPlay } from "react-icons/fa";

const videos = [
  {
    title: "REACT Demo Day 2024 Highlights",
    desc: "Watch as Fellows present their groundbreaking projects and share transformative experiences from the field",
    image: "https://source.unsplash.com/800x600/?conference,presentation",
    duration: "15:42",
    views: "234K views",
    time: "2 weeks ago",
    featured: true,
  },
  {
    title: "A Day in the Life: Fellow Journey",
    desc: "Experience a typical day with REACT Fellows as they navigate challenges and create impact in communities",
    image: "https://source.unsplash.com/800x600/?documentary,village",
    duration: "22:18",
    views: "189K views",
    time: "1 month ago",
    featured: true,
  },
  {
    title: "Partner Stories: NGO Collaboration",
    image: "https://source.unsplash.com/800x600/?ngo,teamwork",
    duration: "8:34",
    views: "98K views",
  },
  {
    title: "PULSE in Practice: Workshop Series",
    image: "https://source.unsplash.com/800x600/?workshop,meeting",
    duration: "12:45",
    views: "156K views",
  },
  {
    title: "Behind the Scenes: Orientation 2024",
    image: "https://www.instagram.com/reel/DQv4yH7Actk/",
    duration: "18:20",
    views: "127K views",
  },
];

const VideoCard = ({ video }) => {
  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      
      {/* MEDIA */}
      <div className="relative">
        {/* Instagram Reel */}
        {video.type === "instagram" ? (
          <div className="w-full aspect-[9/16] bg-black">
            <iframe
              src={video.embed}
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={video.title}
            />
          </div>
        ) : (
          <>
            {/* Thumbnail */}
            <img
              src={video.image}
              alt={video.title}
              className="w-full h-56 object-cover"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center
                group-hover:scale-110 transition"
              >
                <FaPlay className="text-red-600 ml-1" />
              </div>
            </div>

            {/* Duration */}
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </span>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="font-semibold mb-2">{video.title}</h3>

        {video.desc && (
          <p className="text-sm text-gray-600 mb-3">
            {video.desc}
          </p>
        )}

        <div className="flex justify-between text-xs text-gray-500">
          <span>{video.views}</span>
          {video.time && <span>{video.time}</span>}
        </div>
      </div>
    </div>
  );
};

const VideoSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">


        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">
            Videos & Journeys
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fellow journeys, Demo Day highlights, partner stories, and behind-the-scenes from field sites
          </p>
        </div>

        {/* Featured Videos */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {videos
            .filter(v => v.featured)
            .map((video, i) => (
              <VideoCard key={i} video={video} />
            ))}
        </div>

        {/* Smaller Videos */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos
            .filter(v => !v.featured)
            .map((video, i) => (
              <VideoCard key={i} video={video} />
            ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full
            hover:bg-red-700 transition"
          >
            <FaYoutube />
            Visit YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
