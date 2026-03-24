"use client";

import Link from "next/link";

const Footer = ({ domain }) => {
  return (
    <footer className="footer-section tw-text-white tw-py-12">
      <div className="tw-max-w-6xl tw-mx-auto tw-px-5">
        {/* Top */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-10 tw-mb-10">
          <div>
            <h2 className="tw-text-xl tw-font-bold">{domain}</h2>
            <p className="tw-mt-3 tw-text-sm tw-text-gray-500 tw-leading-relaxed">
              A part of the AgentDAO framework, providing specialized and
              personalized agent solutions.
            </p>
          </div>

          <div>
            <h5 className="tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wider tw-text-gray-400">
              About
            </h5>
            <ul className="tw-mt-3 tw-space-y-2 tw-list-none tw-p-0">
              <li>
                <Link
                  href="/about"
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={`https://advertise.ipartner.com/?domain=${domain}`}
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wider tw-text-gray-400">
              Community
            </h5>
            <ul className="tw-mt-3 tw-space-y-2 tw-list-none tw-p-0">
              <li>
                <Link
                  href="/contact"
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  href={`https://contrib.com/to/${domain}`}
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wider tw-text-gray-400">
              Legal
            </h5>
            <ul className="tw-mt-3 tw-space-y-2 tw-list-none tw-p-0">
              <li>
                <Link
                  href="/terms"
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="tw-text-gray-500 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-border-t tw-border-white/[0.06] tw-pt-6">
          <p className="tw-text-gray-600 tw-text-sm">
            &copy; {new Date().getFullYear()} {domain}. All Rights Reserved.
          </p>

          <ul className="tw-flex tw-flex-wrap tw-gap-5 tw-mt-4 md:tw-mt-0 tw-list-none tw-p-0">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/terms", label: "Terms" },
              { href: "/privacy", label: "Privacy" },
              {
                href: `https://domaindirectory.com/servicepage/?domain=${domain}`,
                label: "Build",
              },
              {
                href: `https://domaindirectory.com/servicepage/?domain=${domain}`,
                label: "Invest",
              },
              {
                href: `https://domaindirectory.com/servicepage/?domain=${domain}`,
                label: "Manage",
              },
              {
                href: `https://domaindirectory.com/servicepage/?domain=${domain}`,
                label: "Monetize",
              },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="tw-text-gray-600 hover:tw-text-white tw-text-sm tw-transition-colors"
                >
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
