"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchFeaturesData } from "./featuresData";

const DEFAULT_ICON_URL = "https://cdn.vnoc.com/icons/agentdao-common-icon-1.png";

const SectionThree = () => {
  const [featuresData, setFeaturesData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    async function loadFeatures() {
      try {
        const data = await fetchFeaturesData();
        setFeaturesData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadFeatures();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 20, featuresData.length));
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="tw-py-16 tw-bg-gray-900 tw-text-white">
      <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
        <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
          Explore the Expanding AgentDAO Network
        </h2>
        <p className="tw-text-lg tw-text-gray-400 tw-mb-12 tw-max-w-3xl tw-mx-auto">
          Our network is ever-expanding, with new URL assets continuously onboarding into AgentDAO.
          Each agent starts with a base URL, serving as the root for its operations, all culminating with a .com.
          Here&apos;s a glimpse of our growing family:
        </p>

        {loading ? (
          <p className="tw-text-gray-400">Loading features...</p>
        ) : error ? (
          <p className="tw-text-red-500 tw-text-center">Error: {error}</p>
        ) : featuresData.length === 0 ? (
          <p className="tw-text-gray-400">No matching features found.</p>
        ) : (
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-6">
            {featuresData.slice(0, visibleCount).map((feature) => (
              <div key={feature.id} className="tw-border tw-border-gray-600 tw-rounded-xl tw-shadow-lg tw-p-6 tw-text-left">
                <div className="tw-flex tw-items-center tw-mb-4">
                  <Image
                    src={imageErrors[feature.id] ? DEFAULT_ICON_URL : feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="tw-mr-3"
                    onError={() => handleImageError(feature.id)}
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
        )}

        {visibleCount < featuresData.length && !loading && (
          <button onClick={handleViewMore} className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-6 tw-rounded-xl tw-mt-6">
            View More
          </button>
        )}
      </div>
    </section>
  );
};

export default SectionThree;
