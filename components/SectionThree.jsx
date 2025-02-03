"use client";

import React, { useState } from "react";
import featuresData from "./featuresData";
import Image from "next/image";

const SectionThree = () => {
  const [visibleCount, setVisibleCount] = useState(20);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  return (
    <section className="tw-py-16 tw-bg-gray-9001 tw-text-white">
      <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
        <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
          Explore the Expanding AgentDAO Network
        </h2>
        <p className="tw-text-lg tw-text-gray-400 tw-mb-12 tw-max-w-3xl tw-mx-auto">
          Our network is ever-expanding, with new URL assets continuously onboarding into AgentDAO. 
          Each agent starts with a base URL, serving as the root for its operations, all culminating with a .com. 
          Here&apos;s a glimpse of our growing family:
        </p>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-6">
          {featuresData.slice(0, visibleCount).map((feature) => (
            <div key={feature.id} className="tw-border tw-border-gray-600 tw-rounded-xl tw-shadow-lg tw-p-6 tw-text-left">
              <div className="tw-flex tw-items-center tw-mb-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="tw-mr-3"
                />
                <h5 className="tw-text-lg tw-font-semibold">
                  <a href={feature.link} target="_blank" rel="noopener noreferrer" className="tw-text-blue-400 hover:tw-underline">
                    {feature.title}
                  </a>
                </h5>
              </div>
              <p className="tw-text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {visibleCount < featuresData.length && (
          <div className="tw-mt-8">
            <button
              onClick={handleViewMore}
              className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-2 tw-px-6 tw-rounded-xl tw-shadow-md hover:tw-opacity-80"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionThree;
