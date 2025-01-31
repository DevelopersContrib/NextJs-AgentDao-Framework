"use client";

import Link from "next/link";

const Footer = ({ domain }) => {
  return (
    <footer className="tw-bg-black tw-text-white tw-py-10">
      <div className="tw-container tw-mx-auto tw-px-4">
        {/* Top Section */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-8 tw-mb-8">
          {/* Domain Info */}
          <div>
            <h2 className="tw-text-2xl tw-font-bold">{domain}</h2>
            <p className="tw-mt-3 tw-text-gray-400">
              A part of the AgentDAO framework, providing specialized and personalized agent solutions.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h5 className="tw-text-lg tw-font-semibold">About</h5>
            <ul className="ps-0 tw-mt-3 tw-space-y-2">
              <li>
                <Link href="/about" className="tw-text-gray-300 hover:tw-text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="tw-text-gray-300 hover:tw-text-white">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h5 className="tw-text-lg tw-font-semibold">Community</h5>
            <ul className="ps-0  tw-mt-3 tw-space-y-2">
              <li>
                <Link href="/contact" className="tw-text-gray-300 hover:tw-text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partner" className="tw-text-gray-300 hover:tw-text-white">
                  Partner
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="tw-text-gray-300 hover:tw-text-white">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h5 className="tw-text-lg tw-font-semibold">Legal</h5>
            <ul className="ps-0 tw-mt-3 tw-space-y-2">
              <li>
                <Link href="/terms" className="tw-text-gray-300 hover:tw-text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="tw-text-gray-300 hover:tw-text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-border-t tw-border-gray-700 tw-pt-6">
          <p className="tw-text-gray-400">
            &copy; {new Date().getFullYear()} {domain}. All Rights Reserved.
          </p>

          {/* Footer Links */}
          <ul className="ps-0 tw-flex tw-flex-wrap tw-gap-4 tw-mt-4 md:tw-mt-0">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/terms", label: "Terms" },
              { href: "/privacy", label: "Privacy" },
              { href: `https://domaindirectory.com/servicepage/?domain=${domain}`, label: "Build" },
              { href: `https://domaindirectory.com/servicepage/?domain=${domain}`, label: "Invest" },
              { href: `https://domaindirectory.com/servicepage/?domain=${domain}`, label: "Manage" },
              { href: `https://domaindirectory.com/servicepage/?domain=${domain}`, label: "Monetize" },
            ].map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="tw-text-gray-300 hover:tw-text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
