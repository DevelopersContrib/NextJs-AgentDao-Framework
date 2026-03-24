"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Bot,
  Coins,
  Database,
  DollarSign,
  TrendingUp,
  Flame,
  Lock,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Domain Minting",
    description:
      "Mint premium AI-powered domains as NFTs on the blockchain with built-in utility and ownership rights.",
    icon: Globe,
    color: "#34d399",
  },
  {
    step: "02",
    title: "Agent Activation",
    description:
      "Activate autonomous AI agents tied to your domain for marketing, sales, and workflow automation.",
    icon: Bot,
    color: "#60a5fa",
  },
  {
    step: "03",
    title: "Token Economy",
    description:
      "Earn ADAO tokens through agent activity, ecosystem participation, and value generation.",
    icon: Coins,
    color: "#fbbf24",
  },
  {
    step: "04",
    title: "Staking & Rewards",
    description:
      "Stake tokens to earn compounding rewards while helping secure and govern the protocol.",
    icon: Database,
    color: "#a78bfa",
  },
];

const benefits = [
  { title: "Sustainable Revenue", icon: DollarSign, color: "#34d399" },
  { title: "Passive Earnings", icon: TrendingUp, color: "#60a5fa" },
  { title: "Deflationary Model", icon: Flame, color: "#fbbf24" },
  { title: "Value Locked", icon: Lock, color: "#a78bfa" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const Revenue = () => {
  return (
    <section className="revenue-section tw-relative tw-overflow-hidden tw-py-24 md:tw-py-32">
      <div className="tw-relative tw-z-10 tw-max-w-6xl tw-mx-auto tw-px-5">
        {/* Section header */}
        <motion.div
          className="tw-text-center tw-mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="features-label">How It Works</span>
          <h2 className="features-heading tw-mt-4">
            The AgentDAO{" "}
            <span className="hero-gradient-text">Revenue Flow</span>
          </h2>
          <p className="tw-text-gray-400 tw-mt-4 tw-max-w-2xl tw-mx-auto tw-text-base md:tw-text-lg tw-leading-relaxed">
            A self-sustaining economy where domains, AI agents, and token
            holders mutually benefit from increased adoption and activity.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="revenue-steps tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-5 tw-relative">
          <div className="revenue-connector" aria-hidden="true" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="revenue-card"
              style={{ "--step-color": step.color }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="revenue-step-number">{step.step}</div>
              <div className="revenue-icon-wrapper">
                <step.icon size={22} strokeWidth={1.8} color={step.color} />
              </div>
              <h3 className="tw-text-base tw-font-semibold tw-text-white tw-mt-4">
                {step.title}
              </h3>
              <p className="tw-text-sm tw-text-gray-400 tw-mt-2 tw-leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          className="revenue-benefits tw-mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="tw-text-sm tw-font-semibold tw-text-gray-500 tw-uppercase tw-tracking-wider tw-text-center tw-mb-6">
            Key Benefits
          </h3>
          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="benefit-pill"
                style={{ "--pill-color": benefit.color }}
              >
                <benefit.icon size={16} strokeWidth={2} color={benefit.color} />
                <span>{benefit.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Revenue;
