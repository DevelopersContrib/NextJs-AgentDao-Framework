import React from "react";
import Image from "next/image";
import Link from "next/link";

const featureAgents = [
  {
    tld: "vbot.ai",
    logo: "https://cdn.vnoc.com/logos/logo-Vbot-1.png",
    price: "$49000",
    description: "Vbot is an advanced AI assistant for automating workflows and communication.",
  },
  {
    tld: "contentagent.io",
    logo: "https://cdn.vnoc.com/logos/logo-contentagent-1.png",
    price: "$29000",
    description: "ContentAgent helps you create, optimize, and distribute high-quality content.",
  },
  {
    tld: "socialagent.ai",
    logo: "https://cdn.vnoc.com/logos/logo-socialagent1.png",
    price: "$39000",
    description: "SocialAgent manages and automates your social media engagement and growth.",
  },
  {
    tld: "growagent.com",
    logo: "https://vnoclogos.s3-us-west-1.amazonaws.com/logo-growagent.png",
    price: "$59000",
    description: "An AI-powered trading bot that maximizes investment opportunities.",
  },
];

const AgentSection = () => {
  return (
    <section className="tw-py-16 tw-bg-gray-900 tw-text-white">
      <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
        <div className="tw-text-center tw-mb-12">
        <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">Featured Agents</h2>
          <p className="tw-text-xl tw-text-gray-400">
            Discover and Engage with Top Autonomous Agents
          </p>
        </div>

        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
          {featureAgents.map((agent, index) => (
            <div
              key={index}
              className="tw-relative tw-bg-gray-800 tw-text-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-flex tw-flex-col tw-border tw-border-gray-700"
            >
              <div
                className="tw-absolute tw-top-0 tw-bg-red-500 tw-text-white tw-text-xs tw-font-bold tw-px-3 tw-py-1 
                tw-shadow-lg tw-rounded-bl-lg
                before:tw-absolute before:tw-content-[''] before:tw-right-0 before:tw-top-full before:tw-border-t-8 
                before:tw-border-r-8 before:tw-border-transparent before:tw-border-t-red-700"
                style={{ right: "-8px" }}
              >
                Live on Base
              </div>

              <div className="tw-flex-grow tw-text-center tw-pt-2">
                <div className="tw-bg-white tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-mx-auto tw-mb-4 tw-p-2 tw-shadow">
                  <Link href={`https://${agent.tld}`}>
                    <Image
                      src={agent.logo}
                      alt={agent.tld}
                      height={50}
                      width={180}
                      className="tw-object-contain"
                    />
                  </Link>
                </div>

                <p className="tw-font-semibold tw-text-gray-300 tw-mb-2">TV: {agent.price}</p>
                {agent.description && (
                  <div className="tw-mb-4">
                    <small className="tw-text-gray-400">{agent.description}</small>
                  </div>
                )}
              </div>

              <Link href={`https://${agent.tld}`} className="tw-mt-auto">
              <button className="tw-w-full tw-bg-gray-700 tw-text-white hover:tw-bg-gray-600 tw-border tw-border-gray-600 tw-transition tw-py-2 tw-rounded">
                  Contrib Today
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
