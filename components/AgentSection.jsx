"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

const priceChanges = ["+12.5%", "+8.3%", "+15.7%", "+6.2%", "+22.1%", "+4.8%"];
const volumes = ["$2.4M", "$1.8M", "$3.2M", "$1.5M", "$2.9M", "$2.1M"];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const AgentSection = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      const cacheKey = "featured_agents_cache";
      const cached = localStorage.getItem(cacheKey);
      const now = Date.now();
      const cacheExpiry = 24 * 60 * 60 * 1000;

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (now - timestamp < cacheExpiry) {
          setAgents(data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          "/api/adao-fetcher?url=" +
            encodeURIComponent(
              "/marketplace/getall?api_key=a088239f8263dc8f&page=1&filter=&limit=8"
            )
        );
        if (response.ok) {
          const data = await response.json();
          const agentsArray = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.agents)
                ? data.agents
                : [];

          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: agentsArray, timestamp: now })
          );

          setAgents(agentsArray);
        } else {
          setAgents(getStaticAgents());
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
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
      description: "Smart accounting system for digital entities",
    },
    {
      tld: "bankagent.com",
      name: "BankAgent",
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      price: 89000,
      description: "AI-driven banking and financial services",
    },
    {
      tld: "careagent.com",
      name: "CareAgent",
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      price: 156000,
      description: "Personalized healthcare and telemedicine",
    },
    {
      tld: "businessbot.com",
      name: "BusinessBot",
      logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
      price: 98000,
      description: "Business process automation and management",
    },
  ];

  const renderHeader = () => (
    <motion.div
      className="tw-text-center tw-mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <span className="features-label">Marketplace</span>
      <h2 className="features-heading tw-mt-4">
        <span className="hero-gradient-text">Featured Agents</span>
      </h2>
      <p className="tw-text-gray-400 tw-mt-4 tw-max-w-2xl tw-mx-auto tw-text-base md:tw-text-lg tw-leading-relaxed">
        Discover and invest in top autonomous agents on the network.
      </p>
      <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-6 tw-mt-6 tw-text-sm tw-text-gray-500">
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full tw-inline-block" />
          <span>Live Trading</span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-w-2 tw-h-2 tw-bg-blue-500 tw-rounded-full tw-inline-block" />
          <span>Base Network</span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-w-2 tw-h-2 tw-bg-purple-500 tw-rounded-full tw-inline-block" />
          <span>24/7 Market</span>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="agent-section tw-py-24 tw-text-white">
        <div className="tw-max-w-6xl tw-mx-auto tw-px-5">
          {renderHeader()}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="agent-card tw-p-6 tw-animate-pulse">
                <div className="tw-h-12 tw-bg-white/5 tw-rounded tw-mb-4" />
                <div className="tw-h-4 tw-bg-white/5 tw-rounded tw-mb-2" />
                <div className="tw-h-4 tw-bg-white/5 tw-rounded tw-mb-4" />
                <div className="tw-h-10 tw-bg-white/5 tw-rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="agent-section tw-py-24 tw-text-white">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-5">
        {renderHeader()}

        {Array.isArray(agents) && agents.length > 0 ? (
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-5">
            {agents.map((agent, index) => (
              <motion.div
                key={index}
                className="tw-group tw-relative agent-card tw-text-white tw-p-6 tw-flex tw-flex-col"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                {/* Status Badge */}
                <div className="tw-absolute tw-top-0 tw-right-0 agent-badge-live tw-text-white tw-text-xs tw-font-bold tw-px-3 tw-py-1 tw-rounded-bl-xl tw-rounded-tr-2xl">
                  <div className="tw-flex tw-items-center tw-gap-1.5">
                    <span className="tw-w-1.5 tw-h-1.5 tw-bg-white tw-rounded-full tw-animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Price Change */}
                <div className="tw-absolute tw-top-0 tw-left-0 agent-badge-change tw-text-white tw-text-xs tw-font-bold tw-px-2.5 tw-py-1 tw-rounded-br-xl tw-rounded-tl-2xl">
                  {priceChanges[index % priceChanges.length]}
                </div>

                <div className="tw-flex-grow tw-text-center tw-pt-6">
                  {/* Logo */}
                  <div className="agent-logo-box tw-flex tw-justify-center tw-items-center tw-mx-auto tw-mb-4 tw-p-3">
                    <Link
                      href={`https://${agent.tld}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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

                  {/* Domain */}
                  <h3 className="tw-font-bold tw-text-lg tw-text-white tw-mb-2">
                    {agent.tld}
                  </h3>

                  {/* Price */}
                  <div className="tw-mb-3">
                    <p className="tw-font-bold tw-text-2xl tw-text-green-400 tw-mb-1">
                      {formatNumber(agent.price)}
                    </p>
                    <p className="tw-text-xs tw-text-gray-500">Market Cap</p>
                  </div>

                  {/* Token Value */}
                  <div className="agent-stat-box tw-rounded-lg tw-p-3 tw-mb-4">
                    <p className="tw-text-xs tw-text-gray-400 tw-mb-1">
                      Token Value
                    </p>
                    <p className="tw-font-semibold tw-text-blue-400 tw-text-sm">
                      {formatCurrency(
                        calculateTokenValue(agent.price || 0)
                      )}
                    </p>
                  </div>

                  {/* Volume */}
                  <div className="tw-flex tw-justify-between tw-text-xs tw-text-gray-400 tw-mb-4">
                    <span>24h Volume</span>
                    <span className="tw-text-green-400 tw-font-semibold">
                      {volumes[index % volumes.length]}
                    </span>
                  </div>

                  {/* Description */}
                  {agent.description && (
                    <div className="tw-mb-4">
                      <p className="tw-text-sm tw-text-gray-400 tw-leading-relaxed tw-line-clamp-2">
                        {agent.description}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-4 tw-text-xs">
                    <div className="agent-stat-box tw-rounded-lg tw-p-2">
                      <p className="tw-text-gray-500">Supply</p>
                      <p className="tw-font-semibold tw-text-white">1M</p>
                    </div>
                    <div className="agent-stat-box tw-rounded-lg tw-p-2">
                      <p className="tw-text-gray-500">Network</p>
                      <p className="tw-font-semibold tw-text-blue-400">Base</p>
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <Link
                  href={`https://app.agentdao.com/domain/${agent.tld}`}
                  target="_blank"
                  className="hero-btn-primary tw-w-full tw-justify-center tw-text-sm tw-py-3"
                >
                  <span>Buy Token</span>
                  <svg
                    className="tw-w-4 tw-h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="tw-text-gray-400 tw-text-lg tw-mt-8 tw-text-center">
            No agents available at the moment.
          </div>
        )}

        {/* View All */}
        <motion.div
          className="tw-text-center tw-mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="https://app.agentdao.com/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-outline tw-inline-flex"
          >
            <span>View All Agents</span>
            <svg
              className="tw-w-4 tw-h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentSection;
