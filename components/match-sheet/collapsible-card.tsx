import React, { useState } from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CollapsibleCard = ({ title, children, defaultOpen }: CardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
          onClick={toggleCard}
        >
          <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
          <svg
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            } w-6 h-6 text-gray-600`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Collapsible Content */}
        <div
          className={`${
            isOpen ? "max-h-full" : "max-h-0"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="p-4 text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCard;
