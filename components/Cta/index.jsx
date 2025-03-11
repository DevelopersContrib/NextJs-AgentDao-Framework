"use client";

const Cta = () => {
  return (
    <section className="tw-py-32 tw-text-center">
      <div className="tw-container tw-mx-auto tw-px-4">
        <h2 className="tw-text-4xl tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-animate-gradient-text">
          Ready to Join the Future?
        </h2>
        <p className="tw-text-xl tw-text-gray-400 tw-mb-12 tw-max-w-2xl tw-mx-auto">
          Don&apos;t miss out on the next generation of digital assets. Join AgentDAO today.
        </p>
        <a
          href="https://agentdao.com/"
          className="tw-inline-block tw-bg-gradient-to-r tw-from-pink-500 tw-via-red-500 tw-to-yellow-500 tw-text-white tw-font-semibold tw-py-4 tw-px-8 tw-rounded-full tw-shadow-lg hover:tw-scale-105 hover:tw-shadow-xl transition-transform duration-300 animate-pulse"
          target="_blank"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default Cta;

<style jsx>{`
  .tw-animate-gradient-text {
    background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c, #f1c40f);
    background-size: 200% 200%;
    animation: gradient-text 3s ease infinite;
  }

  @keyframes gradient-text {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`}</style>
