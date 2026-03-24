"use client";
import { motion } from "framer-motion";
import {
  Coins,
  Bot,
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Tokenomics",
    description:
      "Revolutionary token economics designed for sustainable growth and long-term value creation across the ecosystem.",
    icon: Coins,
    color: "#00ffb3",
  },
  {
    title: "AI Agents",
    description:
      "Deploy autonomous agents that work around the clock — for marketing, sales, automation, and community building.",
    icon: Bot,
    color: "#60a5fa",
  },
  {
    title: "Dashboard",
    description:
      "Real-time analytics and monitoring of your digital assets, agent performance, and portfolio in one place.",
    icon: LayoutDashboard,
    color: "#a78bfa",
  },
  {
    title: "Staking & Rewards",
    description:
      "Stake your ADAO tokens to earn passive rewards while helping secure and govern the decentralized network.",
    icon: Layers,
    color: "#f472b6",
  },
  {
    title: "Marketplace",
    description:
      "Browse, buy, and sell AI agents in a permissionless marketplace powered by smart contracts.",
    icon: ShoppingBag,
    color: "#fbbf24",
  },
  {
    title: "Governance",
    description:
      "Shape the future of AgentDAO through community-driven proposals, voting, and transparent decision-making.",
    icon: Users,
    color: "#34d399",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Features = () => {
  return (
    <section className="features-section tw-relative tw-overflow-hidden tw-py-24 md:tw-py-32">
      <div className="tw-relative tw-z-10 tw-max-w-6xl tw-mx-auto tw-px-5">
        {/* Section header */}
        <motion.div
          className="tw-text-center tw-mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="features-label">Features</span>
          <h2 className="features-heading tw-mt-4">
            Everything you need to{" "}
            <span className="hero-gradient-text">build the future</span>
          </h2>
          <p className="tw-text-gray-400 tw-mt-4 tw-max-w-2xl tw-mx-auto tw-text-base md:tw-text-lg tw-leading-relaxed">
            A complete toolkit for deploying, managing, and monetizing
            autonomous AI agents in a decentralized ecosystem.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div
                className="feature-icon-wrapper"
                style={{
                  "--icon-color": feature.color,
                }}
              >
                <feature.icon
                  size={24}
                  strokeWidth={1.8}
                  color={feature.color}
                />
              </div>
              <h3 className="tw-text-lg tw-font-semibold tw-text-white tw-mt-5">
                {feature.title}
              </h3>
              <p className="tw-text-sm tw-text-gray-400 tw-mt-2 tw-leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
