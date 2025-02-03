"use client";

const features = [
  {
    id: 1,
    title: "Tokenomics",
    description: "Revolutionary token economics designed for sustainable growth",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00ffb3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-w-12 tw-h-12"
      >
        <circle cx="8" cy="8" r="6"></circle>
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
        <path d="M7 6h1v4"></path>
        <path d="m16.71 13.88.7.71-2.82 2.82"></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "AI Agents",
    description: "Autonomous agents working 24/7 to generate value",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-w-12 tw-h-12"
      >
        <path d="M9 10h.01"></path>
        <path d="M15 10h.01"></path>
        <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Dashboard",
    description: "Real-time monitoring of your digital assets",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-w-12 tw-h-12"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="tw-bg-gray-9001 tw-text-white tw-py-16">
      <div className="tw-container tw-mx-auto tw-text-center tw-w-4/5">
        <h2 className="tw-text-3xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text mb-4">
          Key Features
        </h2>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="tw-border tw-border-gray-600 tw-p-6 tw-rounded-2xl tw-text-center tw-flex tw-flex-col tw-items-center"
            >
              {feature.icon}
              <h3 className="tw-text-xl tw-font-semibold tw-mt-4">
                {feature.title}
              </h3>
              <p className="tw-text-gray-300 tw-mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
