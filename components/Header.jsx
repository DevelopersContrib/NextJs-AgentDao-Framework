"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useThemeStore } from "@/lib/store/useThemeStore";
import { fetchDomainDataWithCache, getCachedLogo } from "@/lib/domain-cache";

// Helper function to capitalize the first letter and remove the domain extension
const capitalizeDomain = (domain) => {
  if (!domain) return "";
  const domainWithoutExtension = domain.split(".")[0]; // Remove the extension
  return domainWithoutExtension.charAt(0).toUpperCase() + domainWithoutExtension.slice(1);
};

const Header = ({ domain, setShowTopHeader }) => {
  const { theme, setTheme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Load theme with aggressive caching for thousands of domains
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Get cached logo immediately for instant display
        const cachedLogo = getCachedLogo(domain);
        setTheme({
          logo: cachedLogo,
          primaryColor: "#000000",
          secondaryColor: "#ffffff"
        });
        
        // Fetch complete domain data in background
        const domainData = await fetchDomainDataWithCache(domain);
        setTheme(domainData);
      } catch (error) {
        console.error('Error loading theme:', error);
        setTheme({
          logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
          primaryColor: "#000000",
          secondaryColor: "#ffffff"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [domain, setTheme]);

  const { logo } = theme || {};
  const capitalizedDomain = capitalizeDomain(domain);

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
          <Link
            href={`https://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {logo ? (
              <Image
                src={logo}
                alt="header-logo"
                width={150}
                height={50}
                layout="intrinsic"
              />
            ) : (
              <div className="tw-text-capitalize tw-text-2xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-600 tw-text-transparent tw-bg-clip-text">
                {capitalizedDomain}
              </div>
            )}
          </Link>
        </div>

        <div className="tw-flex tw-items-center tw-justify-center tw-space-x-6 tw-h-full">
          <ul className="tw-flex tw-items-center tw-space-x-6 tw-text-lg tw-mb-0">
            <li>
              <Link
                href="/about"
                className="tw-hover:text-gray-300"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="https://agentdao.com/tokenomics"
                target="_blank"
                className="tw-hover:text-gray-300"
              >
                Tokenomics
              </a>
            </li>
            <li>
              <a
                href="https://agentdao.com/agents"
                target="_blank"
                className="tw-hover:text-gray-300"
              >
                Agents
              </a>
            </li>
            <li>
              <a
                href="/referral"
                className="tw-hover:text-gray-300"
              >
                Referral
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="tw-hover:text-gray-300"
              >
                Inquire
              </Link>
            </li>
          </ul>

          <a
            href="https://adao.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-2 tw-px-5 tw-rounded-full tw-shadow-md hover:tw-opacity-80 focus:tw-outline-none tw-flex tw-items-center"
          >
            Buy Adao Token
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
