import { FaPenNib } from "react-icons/fa";
import ContentCard from "./ContentCard";

const ExploreSection = ({ title, subtitle, items }) => {
  return (
    <section className="py-20 bg-gray-50 relative -mt-12 z-10">
      <div
        className="max-w-7xl mx-auto px-6
        bg-white rounded-2xl shadow-lg
        py-16"
      >


        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <ContentCard key={idx} {...item} />
          ))}
        </div>

        {/* CTA */}

      </div>
    </section>
  );
};

export default ExploreSection;
