/* eslint-disable react/no-unescaped-entities */
import Script from 'next/script';
import { getDomain } from '../../lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const Terms = () => {
  const domain = getDomain();

  return (
    <>
    <Header domain={domain}/>  
      <section className="tw-bg-black tw-text-white tw-py-16 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h1 className="tw-text-5xl tw-font-bold">Terms and Conditions</h1>
        </div>
      </section>

      <section className="tw-bg-gray-900 tw-py-16 tw-text-left">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h2 className="tw-text-4xl tw-font-bold tw-text-white">Introduction</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            Welcome to [Your Company Name]. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Use of the Site</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Eligibility: You must be at least 18 years old to use this site.</li>
            <li>Account Responsibility: You are responsible for maintaining the confidentiality of your account and password.</li>
            <li>Prohibited Activities: You agree not to engage in any activity that disrupts or interferes with the site.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Intellectual Property</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Ownership: All content, trademarks, and data on this site are owned by [Your Company Name] or its licensors.</li>
            <li>Restrictions: You may not reproduce, distribute, or create derivative works from any content on this site without permission.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">User Content</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Responsibility: You are responsible for any content you post on the site.</li>
            <li>Rights: By posting content, you grant [Your Company Name] a non-exclusive, royalty-free license to use, reproduce, and distribute your content.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Limitation of Liability</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Disclaimer: The site is provided "as is" without warranties of any kind.</li>
            <li>Liability: [Your Company Name] will not be liable for any damages arising from the use of this site.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Changes to Terms</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            Modifications: We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
          </p>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Governing Law</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            Jurisdiction: These terms are governed by the laws of [Your Jurisdiction].
          </p>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Contact Us</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            If you have any questions about these terms, please contact us at [Your Contact Information].
          </p>
        </div>
      </section>
      <Footer domain={domain} />
    </>
  );
};

export default Terms;