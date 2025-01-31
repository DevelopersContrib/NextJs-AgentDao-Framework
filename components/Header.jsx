"use client";
import { useState } from "react";
import Link from "next/link";

const Header = ({ domain }) => {
  const [showTopHeader, setShowTopHeader] = useState(true);

  return (
    <header>
      {showTopHeader && (
        <div className="tw-bg-black tw-text-white tw-text-sm tw-py-2 tw-flex tw-justify-between tw-items-center tw-px-4 lg:tw-px-8">
          <div>
            <a
              href="https://agentdao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-blue-400 tw-font-semibold hover:tw-underline"
            >
              Powered by AgentDao
            </a>
          </div>

          <div className="tw-flex tw-gap-4">
            <a
              href={`https://contrib.com/to/${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-gray-300 hover:tw-text-white"
            >
              Register
            </a>
            <a
              href="https://adao.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-gray-300 hover:tw-text-white"
            >
              Buy Adao
            </a>
          </div>

          <button
            onClick={() => setShowTopHeader(false)}
            className="tw-text-gray-400 hover:tw-text-white tw-text-lg tw-font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <nav className="tw-bg-black1 tw-text-white tw-py-4 tw-container tw-mx-auto tw-flex tw-justify-between tw-items-center">
        <div>
          <Link href="/">
            <div className="tw-text-2xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
              {domain || "AgentDAO"}
            </div>
          </Link>
        </div>

        <div className="tw-flex tw-items-center tw-space-x-6">
          <ul className="tw-flex tw-space-x-6 tw-text-lg">
            <li>
              <Link href="/about" className="tw-hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <a href="https://agentdao.com/tokenomics" target="_blank" className="tw-hover:text-gray-300">
                Tokenomics
              </a>
            </li>
            <li>
              <a href="https://agentdao.com/agents" target="_blank" className="tw-hover:text-gray-300">
                Agents
              </a>
            </li>
            <li>
              <Link href="/contact" className="tw-hover:text-gray-300">
                Inquire
              </Link>
            </li>
          </ul>

          <a
            href="https://adao.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-2 tw-px-5 tw-rounded-full tw-shadow-md hover:tw-opacity-80 focus:tw-outline-none"
          >
            Buy Adao Token
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
