import { getDomain } from "../../lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const Terms = () => {
  const domain = getDomain();

  return (
    <>
      <Header domain={domain} />
      <PageHero
        label="Legal"
        title="Terms and Conditions"
        subtitle="Please read these terms carefully before using our platform."
      />

      <section className="legal-content tw-py-16 md:tw-py-20">
        <div className="tw-max-w-3xl tw-mx-auto tw-px-5">
          <h2>Introduction</h2>
          <p>
            Welcome to AgentDAO. By accessing or using our website, you agree to
            comply with and be bound by the following terms and conditions.
            Please read them carefully.
          </p>

          <h2>Use of the Site</h2>
          <ul>
            <li>
              <strong>Eligibility:</strong> You must be at least 18 years old to
              use this site.
            </li>
            <li>
              <strong>Account Responsibility:</strong> You are responsible for
              maintaining the confidentiality of your account and password.
            </li>
            <li>
              <strong>Prohibited Activities:</strong> You agree not to engage in
              any activity that disrupts or interferes with the site.
            </li>
          </ul>

          <h2>Intellectual Property</h2>
          <ul>
            <li>
              <strong>Ownership:</strong> All content, trademarks, and data on
              this site are owned by AgentDAO or its licensors.
            </li>
            <li>
              <strong>Restrictions:</strong> You may not reproduce, distribute,
              or create derivative works from any content on this site without
              permission.
            </li>
          </ul>

          <h2>User Content</h2>
          <ul>
            <li>
              <strong>Responsibility:</strong> You are responsible for any
              content you post on the site.
            </li>
            <li>
              <strong>Rights:</strong> By posting content, you grant AgentDAO a
              non-exclusive, royalty-free license to use, reproduce, and
              distribute your content.
            </li>
          </ul>

          <h2>Limitation of Liability</h2>
          <ul>
            <li>
              <strong>Disclaimer:</strong> The site is provided &quot;as
              is&quot; without warranties of any kind.
            </li>
            <li>
              <strong>Liability:</strong> AgentDAO will not be liable for any
              damages arising from the use of this site.
            </li>
          </ul>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on this page.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by applicable laws. Any disputes arising
            from these terms shall be resolved in the appropriate jurisdiction.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these terms, please reach out
            through our{" "}
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

export default Terms;
