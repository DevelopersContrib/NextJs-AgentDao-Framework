"use client";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="about-hero tw-relative tw-overflow-hidden tw-flex tw-items-center tw-justify-center">
      <div className="hero-bg-orbs" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="tw-relative tw-z-10 tw-max-w-4xl tw-mx-auto tw-px-5 tw-text-center tw-py-28 md:tw-py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="features-label">About</span>
        </motion.div>

        <motion.h1
          className="hero-headline tw-mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="tw-text-white">Transforming Digital Assets Into</span>
          <br />
          <span className="hero-gradient-text">
            Smart, Autonomous Entities
          </span>
        </motion.h1>

        <motion.p
          className="tw-text-base md:tw-text-lg tw-text-gray-400 tw-mt-6 tw-max-w-2xl tw-mx-auto tw-leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AgentDAO is building the decentralized infrastructure for AI-powered
          agents — enabling anyone to mint, own, deploy, and monetize autonomous
          digital entities on the blockchain.
        </motion.p>

        <motion.div
          className="tw-mt-14 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-8 hero-stats tw-pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { value: "2024", label: "Founded" },
            { value: "Web3", label: "Infrastructure" },
            { value: "Global", label: "Community" },
            { value: "24/7", label: "Agent Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="tw-text-center">
              <div className="tw-text-2xl md:tw-text-3xl tw-font-bold hero-gradient-text">
                {stat.value}
              </div>
              <div className="tw-text-xs tw-text-gray-500 tw-mt-1 tw-uppercase tw-tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
