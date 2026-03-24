"use client";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="cta-section tw-relative tw-overflow-hidden tw-py-28 md:tw-py-36 tw-text-center">
      <div className="cta-glow" aria-hidden="true" />

      <div className="tw-relative tw-z-10 tw-max-w-3xl tw-mx-auto tw-px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="features-label">Get Started</span>
          <h2 className="features-heading tw-mt-5">
            Ready to Join{" "}
            <span className="hero-gradient-text">the Future?</span>
          </h2>
          <p className="tw-text-gray-400 tw-mt-5 tw-text-base md:tw-text-lg tw-leading-relaxed tw-max-w-xl tw-mx-auto">
            Don&apos;t miss out on the next generation of digital assets. Join
            AgentDAO today and start building with autonomous AI agents.
          </p>
        </motion.div>

        <motion.div
          className="tw-mt-10 tw-flex tw-flex-wrap tw-justify-center tw-gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://agentdao.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-primary"
          >
            Get Started Now
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="https://adao.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-outline"
          >
            Buy ADAO Token
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
