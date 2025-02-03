"use client";
import React from 'react';
import { User, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { getDomain } from '../lib/data';

const Header = ({ domain, setShowTopHeader }) => {
  const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);

  return (
    <header>
      <div className="tw-bg-yellow-400 tw-text-black tw-text-sm tw-py-2 tw-flex tw-justify-between tw-items-center tw-px-4 lg:tw-px-8">
        <div>
          <a
            href="https://agentdao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-text-blue-600 tw-font-semibold hover:tw-underline"
          >
            Powered by AgentDao
          </a>
        </div>

        <div className="tw-flex tw-items-center tw-gap-4">
          <Link
            href={`https://contrib.com/to/${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-flex tw-items-center tw-bg-black tw-text-white tw-px-3 tw-py-1 tw-rounded-md hover:tw-bg-gray-800 transition"
          >
            <User className="tw-w-4 tw-h-4 tw-mr-1" />
            Register
          </Link>
          <Link
            href="https://adao.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-flex tw-items-center tw-bg-black tw-text-white tw-px-3 tw-py-1 tw-rounded-md hover:tw-bg-gray-800 transition"
          >
            <ShoppingCart className="tw-w-4 tw-h-4 tw-mr-1" />
            Buy Adao
          </Link>
          <button
            onClick={() => setShowTopHeader(false)}
            className="tw-text-black hover:tw-text-white tw-text-lg tw-font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      <nav className="tw-bg-black1 tw-text-white tw-py-4 tw-container tw-mx-auto tw-flex tw-justify-between tw-items-center">
        <div>
          <Link href="/">
            <div className="tw-text-2xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
              {capitalizedDomain}
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
