"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AGENT_NETWORK_DATA, getRandomAgents } from "@/lib/static-data/agent-network";

const StaticAgentNetwork = () => {
  const [showAll, setShowAll] = useState(false);
  const [displayedAgents, setDisplayedAgents] = useState(getRandomAgents(6));

  const handleShowMore = () => {
    if (showAll) {
      setDisplayedAgents(getRandomAgents(6));
      setShowAll(false);
    } else {
      setDisplayedAgents(AGENT_NETWORK_DATA.agents);
      setShowAll(true);
    }
  };

  return (
    <section className="tw-py-16 tw-bg-gray-50">
      <div className="tw-container tw-mx-auto tw-px-4">
        <div className="tw-text-center tw-mb-12">
          <h2 className="tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-4">
            {AGENT_NETWORK_DATA.title}
          </h2>
          <p className="tw-text-lg tw-text-gray-600 tw-max-w-4xl tw-mx-auto">
            {AGENT_NETWORK_DATA.description}
          </p>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-8">
          {displayedAgents.map((agent, index) => (
            <div
              key={agent.domain}
              className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-hover:shadow-lg tw-transition-shadow tw-duration-300"
            >
              <div className="tw-mb-4">
                <Link
                  href={`https://www.${agent.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-text-xl tw-font-semibold tw-text-blue-600 tw-hover:text-blue-800 tw-transition-colors"
                >
                  {agent.name}
                </Link>
              </div>
              <p className="tw-text-gray-700 tw-text-sm tw-leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>

        <div className="tw-text-center">
          <button
            onClick={handleShowMore}
            className="tw-bg-blue-600 tw-text-white tw-px-8 tw-py-3 tw-rounded-lg tw-font-semibold tw-hover:bg-blue-700 tw-transition-colors tw-duration-200"
          >
            {showAll ? "Show Less" : `Show All ${AGENT_NETWORK_DATA.agents.length} Agents`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default StaticAgentNetwork;
