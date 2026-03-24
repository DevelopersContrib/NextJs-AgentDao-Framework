"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const featuresData = [
  {
    id: "abot",
    domain: "abot.com",
    capitalizedDomain: "Abot.com",
    icon: "🧮",
    color: "#34d399",
    description:
      "Abot.com is an smart accounting system for intelligent digital entities using a transparent model to deliver value.",
  },
  {
    id: "accountbot",
    domain: "accountbot.com",
    capitalizedDomain: "AccountBot.com",
    icon: "📊",
    color: "#60a5fa",
    description:
      "AccountBot.com streamlines financial management by automating bookkeeping, reporting, and account reconciliation for businesses, providing accuracy and saving time.",
  },
  {
    id: "advoagent",
    domain: "advoagent.com",
    capitalizedDomain: "AdvoAgent.com",
    icon: "🤝",
    color: "#a78bfa",
    description:
      "Join a vibrant community of developers, influencers, and entrepreneurs on advoagent.com, all using the versatile CONTRIB token to power their token economies!",
  },
  {
    id: "agentnews",
    domain: "agentnews.com",
    capitalizedDomain: "AgentNews.com",
    icon: "📰",
    color: "#f97316",
    description:
      "AgentNews.com is your premier source for the latest updates in the world of AI and autonomous agents. Stay informed with news, trends, and in-depth analyses.",
  },
  {
    id: "attackagent",
    domain: "attackagent.com",
    capitalizedDomain: "AttackAgent.com",
    icon: "🛡️",
    color: "#f43f5e",
    description:
      "AttackAgent.com specializes in cybersecurity, offering advanced threat detection and response solutions to safeguard businesses against cyberattacks.",
  },
  {
    id: "bankagent",
    domain: "bankagent.com",
    capitalizedDomain: "BankAgent.com",
    icon: "🏦",
    color: "#818cf8",
    description:
      "BankAgent.com enhances banking services with AI-driven financial advice, loan processing, and customer support, optimizing financial operations for users.",
  },
  {
    id: "billagent",
    domain: "billagent.com",
    capitalizedDomain: "BillAgent.com",
    icon: "💳",
    color: "#2dd4bf",
    description:
      "BillAgent.com automates bill payments and invoicing, ensuring timely transactions and reducing the burden of manual financial management.",
  },
  {
    id: "botchallenge",
    domain: "botchallenge.com",
    capitalizedDomain: "BotChallenge.com",
    icon: "🏆",
    color: "#fbbf24",
    description:
      "BotChallenge.com hosts competitions and challenges for AI and robotics enthusiasts. Compete, learn, and innovate in a community-driven platform.",
  },
  {
    id: "businessbot",
    domain: "businessbot.com",
    capitalizedDomain: "BusinessBot.com",
    icon: "💼",
    color: "#94a3b8",
    description:
      "BusinessBot.com automates business processes, from customer service to data management, enabling companies to operate more efficiently.",
  },
  {
    id: "campusbot",
    domain: "campusbot.com",
    capitalizedDomain: "CampusBot.com",
    icon: "🎓",
    color: "#c084fc",
    description:
      "CampusBot.com offers universities and colleges AI-driven tools for student engagement, campus management, and academic support.",
  },
  {
    id: "capitalagent",
    domain: "capitalagent.com",
    capitalizedDomain: "CapitalAgent.com",
    icon: "💰",
    color: "#f59e0b",
    description:
      "CapitalAgent.com connects investors with capital opportunities, offering insights and tools to maximize returns on investment across various sectors.",
  },
  {
    id: "carbonagents",
    domain: "carbonagents.com",
    capitalizedDomain: "CarbonAgents.com",
    icon: "🌱",
    color: "#34d399",
    description:
      "CarbonAgents.com supports sustainability efforts by providing tools and resources for carbon footprint management and reduction strategies.",
  },
  {
    id: "carbonbots",
    domain: "carbonbots.com",
    capitalizedDomain: "CarbonBots.com",
    icon: "🌍",
    color: "#10b981",
    description:
      "CarbonBots.com empowers businesses to manage and reduce their carbon footprint with AI-driven tools for tracking emissions and sustainable practices.",
  },
  {
    id: "careagent",
    domain: "careagent.com",
    capitalizedDomain: "CareAgent.com",
    icon: "🏥",
    color: "#f472b6",
    description:
      "CareAgent.com connects users with personalized healthcare services, from telemedicine to patient care coordination, improving access to quality care.",
  },
  {
    id: "casinobot",
    domain: "casinobot.com",
    capitalizedDomain: "CasinoBot.com",
    icon: "🎰",
    color: "#fb7185",
    description:
      "CasinoBot.com provides AI-powered solutions for the gaming and casino industry, offering tools for player engagement and secure transactions.",
  },
  {
    id: "challengeagent",
    domain: "challengeagent.com",
    capitalizedDomain: "ChallengeAgent.com",
    icon: "⚡",
    color: "#facc15",
    description:
      "Join a vibrant community of developers, influencers, and entrepreneurs on challengeagent.com, using the versatile CONTRIB token to power token economies!",
  },
  {
    id: "courtagent",
    domain: "courtagent.com",
    capitalizedDomain: "CourtAgent.com",
    icon: "⚖️",
    color: "#9ca3af",
    description:
      "CourtAgent.com simplifies legal processes by providing AI-assisted tools for case management, document preparation, and legal research.",
  },
  {
    id: "cruiseagent",
    domain: "cruiseagent.com",
    capitalizedDomain: "CruiseAgent.com",
    icon: "🚢",
    color: "#22d3ee",
    description:
      "CruiseAgent.com connects travelers with personalized cruise experiences, offering expert advice and booking services to create memorable voyages.",
  },
  {
    id: "cyberbots",
    domain: "cyberbots.com",
    capitalizedDomain: "CyberBots.com",
    icon: "🔒",
    color: "#ef4444",
    description:
      "CyberBots.com offers advanced cybersecurity solutions powered by AI, protecting businesses from digital threats and ensuring data integrity.",
  },
  {
    id: "dealagent",
    domain: "dealagent.com",
    capitalizedDomain: "DealAgent.com",
    icon: "🤝",
    color: "#84cc16",
    description:
      "DealAgent.com helps businesses and consumers find the best deals, offering AI-driven negotiation tools and price comparison services.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: (i % 4) * 0.08, ease: "easeOut" },
  }),
};

const StaticEcosystemFeatures = () => {
  return (
    <section className="ecosystem-section tw-py-24 md:tw-py-32 tw-text-white">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-5">
        {/* Header */}
        <motion.div
          className="tw-text-center tw-mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="features-label">Ecosystem</span>
          <h2 className="features-heading tw-mt-4">
            AgentDAO{" "}
            <span className="hero-gradient-text">Ecosystem</span>
          </h2>
          <p className="tw-text-gray-400 tw-mt-4 tw-max-w-2xl tw-mx-auto tw-text-base md:tw-text-lg tw-leading-relaxed">
            Discover the powerful features and capabilities that make AgentDAO
            the leading platform for autonomous agents.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-5 tw-mb-14">
          {featuresData.map((feature, i) => (
            <motion.div
              key={feature.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
            >
              <Link
                href={`https://www.${feature.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-group tw-block ecosystem-card"
              >
                <div className="tw-flex tw-items-center tw-mb-4">
                  <div
                    className="ecosystem-icon-box"
                    style={{ "--eco-color": feature.color }}
                  >
                    <span className="tw-text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="tw-text-base tw-font-semibold tw-text-white tw-ml-3 tw-truncate">
                    {feature.capitalizedDomain}
                  </h3>
                </div>
                <p
                  className="tw-text-sm tw-text-gray-400 tw-leading-relaxed tw-overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {feature.description}
                </p>
                <div className="tw-mt-4 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-font-medium tw-text-blue-400 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                  <span>Visit Site</span>
                  <svg
                    className="tw-w-3 tw-h-3"
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="tw-text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="https://agentdao.com/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-primary tw-inline-flex"
          >
            <span>View More on Marketplace</span>
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

export default StaticEcosystemFeatures;
