"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const DynamicAgentNetwork = ({ domain }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Check cache first
        const cacheKey = `agents_${domain}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) { // 24 hours
            setAgents(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const response = await fetch(`/api/adao-fetcher?url=${encodeURIComponent('/marketplace/getall?api_key=a088239f8263dc8f&page=1&filter=&limit=20')}`);
        
        if (response.ok) {
          const data = await response.json();
          // Handle different possible data structures
          const agentsArray = Array.isArray(data) ? data : 
                             Array.isArray(data?.data) ? data.data :
                             Array.isArray(data?.agents) ? data.agents : [];
          
          setAgents(agentsArray);
          
          // Cache the result
          localStorage.setItem(cacheKey, JSON.stringify({
            data: agentsArray,
            timestamp: Date.now()
          }));
        } else {
          // Fallback to static data
          setAgents(getStaticAgents());
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
        setAgents(getStaticAgents());
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [domain]);

  const getStaticAgents = () => [
    {
      tld: "abot.com",
      name: "Abot.com",
      description: "Smart accounting system for intelligent digital entities using a transparent model to deliver value."
    },
    {
      tld: "accountbot.com", 
      name: "AccountBot.com",
      description: "Streamlines financial management by automating bookkeeping, reporting, and account reconciliation for businesses."
    },
    {
      tld: "advoagent.com",
      name: "advoagent.com", 
      description: "Join a vibrant community of developers, influencers, and entrepreneurs using the versatile CONTRIB token."
    },
    {
      tld: "agentnews.com",
      name: "agentnews.com",
      description: "Your premier source for the latest updates in the world of AI and autonomous agents."
    },
    {
      tld: "attackagent.com",
      name: "attackagent.com",
      description: "Specializes in cybersecurity, offering advanced threat detection and response solutions."
    },
    {
      tld: "bankagent.com",
      name: "bankagent.com", 
      description: "Enhances banking services with AI-driven financial advice, loan processing, and customer support."
    }
  ];

  // Ensure agents is always an array
  const agentsArray = Array.isArray(agents) ? agents : [];
  const displayedAgents = showAll ? agentsArray : agentsArray.slice(0, 6);

  if (loading) {
    return (
      <section className="tw-py-16 tw-bg-gray-50">
        <div className="tw-container tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-mb-12">
            <h2 className="tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-4">
              Explore the Expanding AgentDAO Network
            </h2>
            <p className="tw-text-lg tw-text-gray-600 tw-max-w-4xl tw-mx-auto">
              Our network is ever-expanding, with new URL assets continuously onboarding into AgentDAO. Each agent starts with a base URL, serving as the root for its operations, all culminating with a .com. Here&apos;s a glimpse of our growing family:
            </p>
          </div>
          <div className="tw-flex tw-justify-center">
            <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tw-py-16 tw-bg-gray-50">
      <div className="tw-container tw-mx-auto tw-px-4">
        <div className="tw-text-center tw-mb-12">
          <h2 className="tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-4">
            Explore the Expanding AgentDAO Network
          </h2>
          <p className="tw-text-lg tw-text-gray-600 tw-max-w-4xl tw-mx-auto">
            Our network is ever-expanding, with new URL assets continuously onboarding into AgentDAO. Each agent starts with a base URL, serving as the root for its operations, all culminating with a .com. Here&apos;s a glimpse of our growing family:
          </p>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-8">
          {displayedAgents.map((agent, index) => (
            <div
              key={agent.tld || agent.domain || index}
              className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-hover:shadow-lg tw-transition-shadow tw-duration-300"
            >
              <div className="tw-mb-4">
                <Link
                  href={`https://www.${agent.tld || agent.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-text-xl tw-font-semibold tw-text-blue-600 tw-hover:text-blue-800 tw-transition-colors"
                >
                  {agent.name || agent.tld || agent.domain}
                </Link>
              </div>
              <p className="tw-text-gray-700 tw-text-sm tw-leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>

        <div className="tw-text-center">
          <Link
            href="https://agentdao.com/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-bg-blue-600 tw-text-white tw-px-8 tw-py-3 tw-rounded-lg tw-font-semibold tw-hover:bg-blue-700 tw-transition-colors tw-duration-200 tw-inline-block"
          >
            {showAll ? "View All on Marketplace" : `Show All ${agentsArray.length} Agents`}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DynamicAgentNetwork;
