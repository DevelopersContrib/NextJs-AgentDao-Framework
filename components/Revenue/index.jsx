"use client";

const revenueSteps = [
  {
    id: 1,
    title: "Domain Minting",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-text-green-400"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Agent Activation",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-text-blue-400"
      >
        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "ESH Token Economy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-text-yellow-400"
      >
        <circle cx="8" cy="8" r="6"></circle>
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
        <path d="M7 6h1v4"></path>
        <path d="m16.71 13.88.7.71-2.82 2.82"></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Staking & Rewards",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-text-purple-400"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
        <path d="M3 12A9 3 0 0 0 21 12"></path>
      </svg>
    ),
  },
];

const keyBenefits = [
  { title: "Sustainable Revenue", icon: "dollar-sign" },
  { title: "Passive Earnings", icon: "coins" },
  { title: "Deflationary Model", icon: "bar-chart-3" },
  { title: "Price Growth", icon: "lock" },
];

const Revenue = () => {
  return (
    <section className="tw-bg-gray-9001 tw-text-white tw-py-16">
      <div className="tw-container tw-mx-auto tw-w-4/5 tw-text-center">
        <h2 className="tw-text-3xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
          AgentDAO Revenue Flow
        </h2>

        <div className="tw-mt-8 tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-6">
          {revenueSteps.map((step) => (
            <div
              key={step.id}
              className="tw-border tw-border-gray-600 tw-p-6 tw-rounded-2xl tw-text-center tw-flex tw-flex-col tw-items-center"
            >
              {step.icon}
              <span className="tw-text-sm tw-mt-2">{step.title}</span>
            </div>
          ))}
        </div>

        <div className="tw-border tw-border-gray-600 tw-rounded-2xl tw-mt-12 tw-p-6">
          <h3 className="tw-text-xl tw-font-bold tw-text-center tw-text-blue-400">
            Key Benefits
          </h3>
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4 tw-mt-4">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="tw-flex tw-items-center tw-space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tw-text-yellow-400"
                >
                  <use href={`#${benefit.icon}`} />
                </svg>
                <span className="tw-text-sm">{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>

       <div className="tw-text-center tw-mt-8">
          <p className="tw-text-gray-400">
            AgentDAO creates a self-sustaining economy where domains, AI agents,
            and token holders mutually benefit from increased adoption and
            activity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Revenue;
