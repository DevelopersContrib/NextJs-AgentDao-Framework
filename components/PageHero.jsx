"use client";
import { motion } from "framer-motion";

const PageHero = ({ label, title, subtitle }) => {
  return (
    <section className="page-hero tw-relative tw-overflow-hidden tw-flex tw-items-center tw-justify-center">
      <div className="hero-bg-orbs" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="tw-relative tw-z-10 tw-max-w-3xl tw-mx-auto tw-px-5 tw-text-center tw-py-24 md:tw-py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="features-label">{label}</span>
        </motion.div>

        <motion.h1
          className="hero-headline tw-mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero-gradient-text">{title}</span>
        </motion.h1>

        {subtitle && (
          <motion.p
            className="tw-text-base md:tw-text-lg tw-text-gray-400 tw-mt-5 tw-max-w-2xl tw-mx-auto tw-leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
