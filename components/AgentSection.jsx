"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const calculateTokenValue = (price) => {
  const totalTokens = 1_000_000;
  return price / totalTokens;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
  }).format(value);
};

const formatNumber = (value) => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value?.toLocaleString("en-US") || "N/A"}`;
};

const getRandomPriceChange = () => {
  const changes = ["+12.5%", "+8.3%", "+15.7%", "+6.2%", "+22.1%", "+4.8%"];
  return changes[Math.floor(Math.random() * changes.length)];
};

const getRandomVolume = () => {
  const volumes = ["$2.4M", "$1.8M", "$3.2M", "$1.5M", "$2.9M", "$2.1M"];
  return volumes[Math.floor(Math.random() * volumes.length)];
};

const AgentSection = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      // Check cache first
      const cacheKey = 'featured_agents_cache';
      const cached = localStorage.getItem(cacheKey);
      const now = Date.now();
      const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (now - timestamp < cacheExpiry) {
          setAgents(data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch('/api/adao-fetcher?url=' + encodeURIComponent('/marketplace/getall?api_key=a088239f8263dc8f&page=1&filter=&limit=8'));
        if (response.ok) {
          const data = await response.json();
          const agentsArray = Array.isArray(data) ? data : 
                             Array.isArray(data?.data) ? data.data : 
                             Array.isArray(data?.agents) ? data.agents : [];
          
          // Cache the data
          localStorage.setItem(cacheKey, JSON.stringify({
            data: agentsArray,
            timestamp: now
          }));
          
          setAgents(agentsArray);
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
  }, []);

  const getStaticAgents = () => [
    {
      tld: "abot.com",
      name: "Abot",
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      price: 125000,
      description: "Smart accounting system for digital entities"
    },
    {
      tld: "bankagent.com", 
      name: "BankAgent",
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      price: 89000,
      description: "AI-driven banking and financial services"
    },
    {
      tld: "careagent.com",
      name: "CareAgent", 
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      price: 156000,
      description: "Personalized healthcare and telemedicine"
    },
    {
      tld: "businessbot.com",
      name: "BusinessBot",
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg", 
      price: 98000,
      description: "Business process automation and management"
    }
  ];

  if (loading) {
    return (
      <section className="tw-py-24 tw-bg-gray-900 tw-text-white">
        <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
          <div className="tw-text-center tw-mb-12">
            <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
              Featured Agents
            </h2>
            <p className="tw-text-xl tw-text-gray-400">
              Discover and Invest in Top Autonomous Agents
            </p>
          </div>
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="tw-bg-gray-800 tw-rounded-xl tw-p-6 tw-animate-pulse">
                <div className="tw-h-12 tw-bg-gray-700 tw-rounded tw-mb-4"></div>
                <div className="tw-h-4 tw-bg-gray-700 tw-rounded tw-mb-2"></div>
                <div className="tw-h-4 tw-bg-gray-700 tw-rounded tw-mb-4"></div>
                <div className="tw-h-10 tw-bg-gray-700 tw-rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tw-py-24 tw-bg-gray-900 tw-text-white">
      <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
        <div className="tw-text-center tw-mb-12">
          <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
            Featured Agents
          </h2>
          <p className="tw-text-xl tw-text-gray-400 tw-mb-4">
            Discover and Invest in Top Autonomous Agents
          </p>
          <div className="tw-flex tw-justify-center tw-items-center tw-space-x-8 tw-text-sm tw-text-gray-500">
            <div className="tw-flex tw-items-center">
              <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full tw-mr-2"></div>
              <span>Live Trading</span>
            </div>
            <div className="tw-flex tw-items-center">
              <div className="tw-w-2 tw-h-2 tw-bg-blue-500 tw-rounded-full tw-mr-2"></div>
              <span>Base Network</span>
            </div>
            <div className="tw-flex tw-items-center">
              <div className="tw-w-2 tw-h-2 tw-bg-purple-500 tw-rounded-full tw-mr-2"></div>
              <span>24/7 Market</span>
            </div>
          </div>
        </div>

        {Array.isArray(agents) && agents.length > 0 ? (
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="tw-group tw-relative tw-bg-gradient-to-br tw-from-gray-800 tw-to-gray-900 tw-text-white tw-p-6 tw-rounded-xl tw-shadow-lg tw-flex tw-flex-col tw-border tw-border-gray-700 tw-hover:tw-border-blue-400/50 tw-hover:tw-shadow-2xl tw-hover:tw-shadow-blue-500/20 tw-hover:tw-scale-105 tw-transition-all tw-duration-300"
              >
                {/* Status Badge */}
                <div className="tw-absolute tw-top-0 tw-right-0 tw-bg-gradient-to-r tw-from-green-500 tw-to-emerald-600 tw-text-white tw-text-xs tw-font-bold tw-px-3 tw-py-1 tw-shadow-lg tw-rounded-bl-xl tw-rounded-tr-xl">
                  <div className="tw-flex tw-items-center">
                    <div className="tw-w-2 tw-h-2 tw-bg-white tw-rounded-full tw-mr-2 tw-animate-pulse"></div>
                    Live
                  </div>
                </div>

                {/* Price Change Badge */}
                <div className="tw-absolute tw-top-0 tw-left-0 tw-bg-gradient-to-r tw-from-green-500 tw-to-green-600 tw-text-white tw-text-xs tw-font-bold tw-px-2 tw-py-1 tw-shadow-lg tw-rounded-br-xl tw-rounded-tl-xl">
                  {getRandomPriceChange()}
                </div>

                <div className="tw-flex-grow tw-text-center tw-pt-6">
                  {/* Logo */}
                  <div className="tw-bg-white tw-rounded-xl tw-flex tw-justify-center tw-items-center tw-mx-auto tw-mb-4 tw-p-3 tw-shadow-lg group-hover:tw-scale-110 tw-transition-transform tw-duration-300">
                    <Link href={`https://${agent.tld}`} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={agent.logo || "/default-logo.png"}
                        alt={agent.name || "Agent Logo"}
                        height={50}
                        width={180}
                        className="tw-object-contain"
                        priority
                      />
                    </Link>
                  </div>

                  {/* Domain Name */}
                  <h3 className="tw-font-bold tw-text-lg tw-text-white tw-mb-2 group-hover:tw-text-blue-400 tw-transition-colors">
                    {agent.tld}
                  </h3>

                  {/* Price */}
                  <div className="tw-mb-3">
                    <p className="tw-font-bold tw-text-2xl tw-text-green-400 tw-mb-1">
                      {formatNumber(agent.price)}
                    </p>
                    <p className="tw-text-sm tw-text-gray-400">
                      Market Cap
                    </p>
                  </div>

                  {/* Token Value */}
                  <div className="tw-bg-gray-700 tw-rounded-lg tw-p-3 tw-mb-4">
                    <p className="tw-text-sm tw-text-gray-300 tw-mb-1">Token Value</p>
                    <p className="tw-font-semibold tw-text-blue-400">
                      {formatCurrency(calculateTokenValue(agent.price || 0))}
                    </p>
                  </div>

                  {/* Volume */}
                  <div className="tw-flex tw-justify-between tw-text-xs tw-text-gray-400 tw-mb-4">
                    <span>24h Volume</span>
                    <span className="tw-text-green-400 tw-font-semibold">{getRandomVolume()}</span>
                  </div>

                  {/* Description */}
                  {agent.description && (
                    <div className="tw-mb-4">
                      <p className="tw-text-sm tw-text-gray-300 tw-leading-relaxed tw-line-clamp-2">
                        {agent.description}
                      </p>
                    </div>
                  )}

                  {/* Crypto Stats */}
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-4 tw-text-xs">
                    <div className="tw-bg-gray-700 tw-rounded tw-p-2">
                      <p className="tw-text-gray-400">Supply</p>
                      <p className="tw-font-semibold tw-text-white">1M</p>
                    </div>
                    <div className="tw-bg-gray-700 tw-rounded tw-p-2">
                      <p className="tw-text-gray-400">Network</p>
                      <p className="tw-font-semibold tw-text-blue-400">Base</p>
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <Link 
                  href={`https://app.agentdao.com/domain/${agent.tld}`}
                  target="_blank"
                  className="tw-w-full tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white hover:tw-from-blue-700 hover:tw-to-purple-700 tw-border-0 tw-transition-all tw-py-3 tw-rounded-xl tw-font-semibold tw-shadow-lg hover:tw-shadow-xl tw-transform hover:tw-scale-105 tw-duration-200 tw-flex tw-items-center tw-justify-center"
                >
                  <span>Buy Token</span>
                  <svg className="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="tw-text-gray-400 tw-text-lg tw-mt-8">No agents available at the moment.</div>
        )}

        {/* View All Button */}
        <div className="tw-text-center tw-mt-12">
          <Link
            href="https://app.agentdao.com/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-inline-flex tw-items-center tw-bg-gradient-to-r tw-from-gray-700 tw-to-gray-800 tw-text-white tw-px-8 tw-py-3 tw-rounded-xl tw-font-semibold hover:tw-from-gray-600 hover:tw-to-gray-700 tw-transition-all tw-duration-300 tw-border tw-border-gray-600 hover:tw-border-gray-500"
          >
            <span>View All Agents</span>
            <svg className="tw-w-5 tw-h-5 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
