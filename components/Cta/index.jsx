"use client";

const Cta = () => {
  return (
    <section className="tw-py-32 tw-text-center">
      <div className="tw-container tw-mx-auto tw-px-4">
        <h2 className="tw-text-4xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
          Ready to Join the Future?
        </h2>
        <p className="tw-text-xl tw-text-gray-400 tw-mb-12 tw-max-w-2xl tw-mx-auto">
          Don&apos;t miss out on the next generation of digital assets. Join AgentDAO today.
        </p>
        <a
          href="https://agentdao.com"
          target="_blank"
          rel="noopener noreferrer"
          className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-3 tw-px-6 tw-rounded-xl tw-shadow-md hover:tw-opacity-80"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default Cta;
