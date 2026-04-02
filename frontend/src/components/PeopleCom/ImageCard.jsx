import React from "react";

const ImageCard = ({ image, name, role, link }) => {
  return (
    <div className="bg-white rounded-2xl px-6 py-8 text-center w-[280px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border border-gray-200"
        />
      </div>

      {/* Name */}
      <h3 className="text-base font-semibold text-gray-900">
        {name}
      </h3>

      {/* Role */}
      <p className="text-sm text-gray-600 mt-1">
        {role}
      </p>

      {/* Profile Link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="block mt-3 text-sm text-blue-600 hover:underline"
        >
          Profile
        </a>
      )}
    </div>
  );
};

export default ImageCard;
