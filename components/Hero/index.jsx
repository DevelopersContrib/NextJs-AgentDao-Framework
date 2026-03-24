"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Active Agents" },
  { value: "$2M+", label: "Total Staked" },
  { value: "50+", label: "Integrations" },
  { value: "99.9%", label: "Uptime" },
];

const Hero = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post("/api/leads", { email });

      if (response.data.status) {
        setStatus({
          type: "success",
          message: "You're on the list! We'll be in touch soon.",
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <section className="hero-section tw-relative tw-overflow-hidden tw-flex tw-items-center tw-justify-center">
      <div className="hero-bg-orbs" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="tw-relative tw-z-10 tw-w-full tw-max-w-5xl tw-mx-auto tw-px-5 tw-text-center tw-py-28 md:tw-py-36">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            Powered by Web3 &amp; AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-headline tw-mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero-gradient-text">Powering the Future</span>
          <br />
          <span className="tw-text-white">of Autonomous AI Agents</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="tw-text-base md:tw-text-lg tw-text-gray-400 tw-mt-6 tw-max-w-2xl tw-mx-auto tw-leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mint, own, and deploy AI-powered agents seamlessly. Stake, swap, and
          monetize your AI with AgentDAO&apos;s decentralized, Web3-native
          ecosystem.
        </motion.p>

        {/* Email form */}
        <motion.form
          id="getstarted"
          onSubmit={handleSubmit}
          className="tw-mt-10 tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-3 tw-max-w-md tw-mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="hero-input tw-flex-1 tw-w-full"
            required
          />
          <button
            type="submit"
            className="hero-cta-btn tw-w-full sm:tw-w-auto"
            disabled={loading}
          >
            {loading ? (
              <span className="tw-animate-spin tw-border-2 tw-border-white tw-border-t-transparent tw-rounded-full tw-w-5 tw-h-5" />
            ) : (
              "Get Started"
            )}
          </button>
        </motion.form>

        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`tw-mt-4 tw-text-sm ${
              status.type === "success" ? "tw-text-green-400" : "tw-text-red-400"
            }`}
          >
            {status.message}
          </motion.p>
        )}

        {/* CTA Links */}
        <motion.div
          className="tw-mt-8 tw-flex tw-flex-wrap tw-justify-center tw-gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://agentdao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-primary"
          >
            Learn More
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
            Buy ADAO
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats tw-mt-20 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-8 tw-pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {stats.map((stat) => (
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

export default Hero;
