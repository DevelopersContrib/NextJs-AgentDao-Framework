"use client";

import React, { useState } from 'react';
import featuresData from './featuresData';
import Image from 'next/image';

const SectionThree = () => {
  const [visibleCount, setVisibleCount] = useState(20);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  return (
    <section className="container py-5 mb-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="fw-bold mb-3">Explore the Expanding AgentDAO Network</h2>
          <p className="lead">
            Our network is ever-expanding, with new URL assets continuously onboarding into AgentDAO. 
            Each agent starts with a base URL, serving as the root for its operations, all culminating with a .com. 
            Here&apos;s a glimpse of our growing family:
          </p>
        </div>
      </div>
      <div className="row">
        {featuresData.slice(0, visibleCount).map((feature) => (
          <div key={feature.id} className="col-md-3 mb-4">
          <div className="card h-100 bg-white border-0 card-shadow">
            <div className="card-body text-start">
              <div className="d-flex align-items-center justify-content-start mb-3">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="me-2 feature-image-logo"
                />
                <h5 className="card-title feature-title mb-0">
                  <a href={feature.link} target="_blank" rel="noopener noreferrer">
                    {feature.title}
                  </a>
                </h5>
              </div>
              <p className="card-text feature-description">{feature.description}</p>
            </div>
          </div>
        </div>
        
        ))}
      </div>

      {visibleCount < featuresData.length && (
        <div className="row">
          <div className="col-12 text-center">
            <button onClick={handleViewMore} className="btn btn-secondary btn-sm">
              View More
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionThree;
