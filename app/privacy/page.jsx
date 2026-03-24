import { getDomain } from "../../lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const Privacy = () => {
  const domain = getDomain();

  return (
    <>
      <Header domain={domain} />
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="Your privacy matters. Learn how we collect, use, and protect your information."
      />

      <section className="legal-content tw-py-16 md:tw-py-20">
        <div className="tw-max-w-3xl tw-mx-auto tw-px-5">
          <h2>Introduction</h2>
          <p>
            Welcome to AgentDAO. We are committed to protecting your privacy.
            This Privacy Policy outlines how we collect, use, and safeguard your
            information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> We may collect personal
              information such as your name, email address, and contact details
              when you register or interact with our site.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you
              use our website, including your IP address, browser type, and pages
              visited.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>
              <strong>To Provide Services:</strong> We use your information to
              deliver and improve our services.
            </li>
            <li>
              <strong>Communication:</strong> We may use your contact information
              to send updates, newsletters, and promotional materials.
            </li>
            <li>
              <strong>Analytics:</strong> We analyze usage data to enhance user
              experience and website performance.
            </li>
          </ul>

          <h2>Sharing Your Information</h2>
          <ul>
            <li>
              <strong>Third-Party Services:</strong> We may share your
              information with trusted third-party service providers to assist in
              delivering our services.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose your information
              if required by law or to protect our rights.
            </li>
          </ul>

          <h2>Security</h2>
          <p>
            We implement security measures to protect your information from
            unauthorized access, alteration, or disclosure.
          </p>

          <h2>Your Rights</h2>
          <ul>
            <li>
              <strong>Access:</strong> You have the right to request access to
              the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request corrections to your
              personal information if it is inaccurate.
            </li>
            <li>
              <strong>Deletion:</strong> You may request the deletion of your
              personal information under certain circumstances.
            </li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time.
            Changes will be posted on this page with an updated effective date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please reach out through our{" "}
            <a href="/contact" className="tw-text-blue-400 hover:tw-text-blue-300 tw-underline">
              contact page
            </a>
            .
          </p>
        </div>
      </section>

      <Footer domain={domain} />
    </>
  );
};

export default Privacy;
