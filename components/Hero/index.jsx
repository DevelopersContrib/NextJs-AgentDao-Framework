"use client";
import { useState } from "react";
import axios from "axios";

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
        setStatus({ type: "success", message: "Email submitted successfully!" });
        setEmail("");
      } else {
        setStatus({ type: "error", message: "Failed to save the lead. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setStatus({ type: "error", message: "An error occurred while submitting. Please try again." });
    }

    setLoading(false);
  };

  return (
    <section className="tw-bg-black1 tw-text-white tw-py-32 tw-text-center">
      <div className="tw-container tw-mx-auto tw-max-w-4xl">
        <h1 className="lh-custom tw-text-6xl tw-font-extrabold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
          Powering the Future of Domains with Autonomous AI Agents on AgentDAO
        </h1>

        <p className="tw-text-lg tw-text-gray-300 tw-mt-4">
          Help us Mint, Own, and Deploy AI-powered agents seamlessly. Whether for marketing, automation, sales, or 
          community building—our decentralized, tokenized agents integrate effortlessly with your workflow. Stake, 
          swap, and monetize your AI with AgentDAO’s Web3-powered ecosystem. Own the future of intelligent automation today!
        </p>

        <form id="getstarted" onSubmit={handleSubmit} className="tw-mt-6 tw-flex tw-justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tw-px-4 tw-py-3 tw-rounded-l-xl tw-border tw-border-gray-500 tw-text-black tw-w-64"
            required
          />
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-r-xl tw-shadow-md hover:tw-opacity-80 tw-flex tw-items-center tw-gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="tw-animate-spin tw-border-2 tw-border-white tw-border-t-transparent tw-rounded-full tw-w-5 tw-h-5"></span>
            ) : (
              "Get Started"
            )}
          </button>
        </form>

        {status && (
          <p
            className={`tw-mt-4 ${
              status.type === "success" ? "tw-text-green-400" : "tw-text-red-400"
            }`}
          >
            {status.message}
          </p>
        )}

        <div className="tw-mt-6 tw-flex tw-justify-center tw-gap-4">
          <a
            href="https://agentdao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-3 tw-px-6 tw-rounded-xl tw-shadow-md hover:tw-opacity-80"
          >
            Learn More
          </a>
          <a
            href="https://adao.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-3 tw-px-6 tw-rounded-xl tw-shadow-md hover:tw-opacity-80"
          >
            Buy ADAO
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
