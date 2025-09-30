"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const StaticEcosystemFeatures = () => {
  const featuresData = [
    {
      id: "abot",
      domain: "abot.com",
      capitalizedDomain: "Abot.com",
      icon: "🧮",
      gradient: "tw-from-green-400 tw-to-emerald-600",
      description: "Abot.com is an smart accounting system for intelligent digital entities using a transparent model to deliver value."
    },
    {
      id: "accountbot",
      domain: "accountbot.com",
      capitalizedDomain: "AccountBot.com",
      icon: "📊",
      gradient: "tw-from-blue-400 tw-to-cyan-600",
      description: "AccountBot.com streamlines financial management by automating bookkeeping, reporting, and account reconciliation for businesses, providing accuracy and saving time."
    },
    {
      id: "advoagent",
      domain: "advoagent.com",
      capitalizedDomain: "AdvoAgent.com",
      icon: "🤝",
      gradient: "tw-from-purple-400 tw-to-pink-600",
      description: "Join a vibrant community of developers, influencers, and entrepreneurs on advoagent.com, all using the versatile CONTRIB token to power their token economies!"
    },
    {
      id: "agentnews",
      domain: "agentnews.com",
      capitalizedDomain: "AgentNews.com",
      icon: "📰",
      gradient: "tw-from-orange-400 tw-to-red-600",
      description: "AgentNews.com is your premier source for the latest updates in the world of AI and autonomous agents. Stay informed with news, trends, and in-depth analyses that cover the developments shaping the future of smart technologies and digital automation."
    },
    {
      id: "attackagent",
      domain: "attackagent.com",
      capitalizedDomain: "AttackAgent.com",
      icon: "🛡️",
      gradient: "tw-from-red-400 tw-to-rose-600",
      description: "AttackAgent.com specializes in cybersecurity, offering advanced threat detection and response solutions to safeguard businesses against cyberattacks."
    },
    {
      id: "bankagent",
      domain: "bankagent.com",
      capitalizedDomain: "BankAgent.com",
      icon: "🏦",
      gradient: "tw-from-indigo-400 tw-to-blue-600",
      description: "BankAgent.com enhances banking services with AI-driven financial advice, loan processing, and customer support, optimizing financial operations for users."
    },
    {
      id: "billagent",
      domain: "billagent.com",
      capitalizedDomain: "BillAgent.com",
      icon: "💳",
      gradient: "tw-from-teal-400 tw-to-green-600",
      description: "BillAgent.com automates bill payments and invoicing, ensuring timely transactions and reducing the burden of manual financial management for individuals and businesses."
    },
    {
      id: "botchallenge",
      domain: "botchallenge.com",
      capitalizedDomain: "BotChallenge.com",
      icon: "🏆",
      gradient: "tw-from-yellow-400 tw-to-orange-600",
      description: "BotChallenge.com hosts competitions and challenges for AI and robotics enthusiasts. Compete, learn, and innovate in a community-driven platform designed to push the boundaries of bot development."
    },
    {
      id: "businessbot",
      domain: "businessbot.com",
      capitalizedDomain: "BusinessBot.com",
      icon: "💼",
      gradient: "tw-from-slate-400 tw-to-gray-600",
      description: "BusinessBot.com automates business processes, from customer service to data management, enabling companies to operate more efficiently and focus on growth."
    },
    {
      id: "campusbot",
      domain: "campusbot.com",
      capitalizedDomain: "CampusBot.com",
      icon: "🎓",
      gradient: "tw-from-violet-400 tw-to-purple-600",
      description: "CampusBot.com offers universities and colleges AI-driven tools for student engagement, campus management, and academic support, enhancing the educational experience."
    },
    {
      id: "capitalagent",
      domain: "capitalagent.com",
      capitalizedDomain: "CapitalAgent.com",
      icon: "💰",
      gradient: "tw-from-amber-400 tw-to-yellow-600",
      description: "CapitalAgent.com connects investors with capital opportunities, offering insights and tools to maximize returns on investment across various sectors."
    },
    {
      id: "carbonagents",
      domain: "carbonagents.com",
      capitalizedDomain: "CarbonAgents.com",
      icon: "🌱",
      gradient: "tw-from-green-400 tw-to-teal-600",
      description: "CarbonAgents.com supports sustainability efforts by providing tools and resources for carbon footprint management and reduction strategies."
    },
    {
      id: "carbonbots",
      domain: "carbonbots.com",
      capitalizedDomain: "CarbonBots.com",
      icon: "🌍",
      gradient: "tw-from-emerald-400 tw-to-green-600",
      description: "CarbonBots.com empowers businesses to manage and reduce their carbon footprint with AI-driven tools for tracking emissions, optimizing energy use, and implementing sustainable practices."
    },
    {
      id: "careagent",
      domain: "careagent.com",
      capitalizedDomain: "CareAgent.com",
      icon: "🏥",
      gradient: "tw-from-pink-400 tw-to-rose-600",
      description: "CareAgent.com connects users with personalized healthcare services, from telemedicine to patient care coordination, improving access to quality care."
    },
    {
      id: "casinobot",
      domain: "casinobot.com",
      capitalizedDomain: "CasinoBot.com",
      icon: "🎰",
      gradient: "tw-from-red-400 tw-to-pink-600",
      description: "CasinoBot.com provides AI-powered solutions for the gaming and casino industry, offering tools for player engagement, game optimization, and secure transactions. Elevate your gaming experience with CasinoBot.com."
    },
    {
      id: "challengeagent",
      domain: "challengeagent.com",
      capitalizedDomain: "ChallengeAgent.com",
      icon: "⚡",
      gradient: "tw-from-yellow-400 tw-to-amber-600",
      description: "Join a vibrant community of developers, influencers, and entrepreneurs on challengeagent.com, all using the versatile CONTRIB token to power their token economies!"
    },
    {
      id: "courtagent",
      domain: "courtagent.com",
      capitalizedDomain: "CourtAgent.com",
      icon: "⚖️",
      gradient: "tw-from-gray-400 tw-to-slate-600",
      description: "CourtAgent.com simplifies legal processes by providing AI-assisted tools for case management, document preparation, and legal research."
    },
    {
      id: "cruiseagent",
      domain: "cruiseagent.com",
      capitalizedDomain: "CruiseAgent.com",
      icon: "🚢",
      gradient: "tw-from-cyan-400 tw-to-blue-600",
      description: "CruiseAgent.com connects travelers with personalized cruise experiences, offering expert advice and booking services to create memorable voyages."
    },
    {
      id: "cyberbots",
      domain: "cyberbots.com",
      capitalizedDomain: "CyberBots.com",
      icon: "🔒",
      gradient: "tw-from-red-400 tw-to-orange-600",
      description: "CyberBots.com offers advanced cybersecurity solutions powered by AI, protecting businesses from digital threats and ensuring data integrity."
    },
    {
      id: "dealagent",
      domain: "dealagent.com",
      capitalizedDomain: "DealAgent.com",
      icon: "🤝",
      gradient: "tw-from-green-400 tw-to-lime-600",
      description: "DealAgent.com helps businesses and consumers find the best deals, offering AI-driven negotiation tools and price comparison services."
    }
  ];

  return (
    <section className="tw-py-16 tw-bg-gray-900 tw-text-white">
      <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
        <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
          AgentDAO Ecosystem Features
        </h2>
        <p className="tw-text-lg tw-text-gray-400 tw-mb-12 tw-max-w-3xl tw-mx-auto">
          Discover the powerful features and capabilities that make AgentDAO the leading platform for autonomous agents.
          From advanced AI tools to comprehensive management systems, explore what makes our ecosystem unique.
        </p>

        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6 tw-mb-8">
          {featuresData.map((feature) => (
            <Link
              key={feature.id}
              href={`https://www.${feature.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-group tw-block tw-bg-gradient-to-br tw-from-gray-800 tw-to-gray-900 tw-border tw-border-gray-700 tw-rounded-xl tw-p-6 tw-hover:shadow-2xl tw-hover:shadow-blue-500/20 tw-hover:scale-105 tw-hover:border-blue-400/50 tw-transition-all tw-duration-300 tw-cursor-pointer tw-relative tw-overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`tw-absolute tw-inset-0 tw-bg-gradient-to-br ${feature.gradient} tw-opacity-0 group-hover:tw-opacity-10 tw-transition-opacity tw-duration-300`}></div>
              
              {/* Content */}
              <div className="tw-relative tw-z-10">
                <div className="tw-flex tw-items-center tw-mb-4">
                  <div className={`tw-w-14 tw-h-14 tw-bg-gradient-to-br ${feature.gradient} tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-mr-4 tw-shadow-lg group-hover:tw-scale-110 tw-transition-transform tw-duration-300`}>
                    <span className="tw-text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="tw-text-lg tw-font-bold tw-text-white group-hover:tw-text-blue-400 tw-transition-colors tw-truncate">
                    {feature.capitalizedDomain}
                  </h3>
                </div>
                <p className="tw-text-sm tw-text-gray-300 tw-leading-relaxed tw-overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {feature.description}
                </p>
                
                {/* Visit link indicator */}
                <div className="tw-mt-4 tw-flex tw-items-center tw-text-blue-400 tw-text-xs tw-font-medium tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                  <span>Visit Site</span>
                  <svg className="tw-w-3 tw-h-3 tw-ml-1 tw-transform group-hover:tw-translate-x-1 tw-transition-transform tw-duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="tw-text-center">
          <Link
            href="https://agentdao.com/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-group tw-inline-flex tw-items-center tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-px-8 tw-py-4 tw-rounded-xl tw-font-semibold tw-hover:from-blue-700 tw-hover:to-purple-700 tw-hover:scale-105 tw-hover:shadow-2xl tw-hover:shadow-blue-500/25 tw-transition-all tw-duration-300 tw-relative tw-overflow-hidden"
          >
            {/* Button gradient overlay */}
            <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-white/20 tw-to-transparent tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300"></div>
            
            {/* Button content */}
            <span className="tw-relative tw-z-10">View More on Marketplace</span>
            <svg className="tw-w-5 tw-h-5 tw-ml-2 tw-relative tw-z-10 tw-transform group-hover:tw-translate-x-1 tw-transition-transform tw-duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StaticEcosystemFeatures;
