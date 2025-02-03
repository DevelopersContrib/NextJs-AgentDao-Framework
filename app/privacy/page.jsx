import { getDomain } from '../../lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const Privacy = () => {
  const domain = getDomain();


  return (
    <>
    <Header domain={domain}/>  
      <section className="tw-bg-black tw-text-white tw-py-16 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h1 className="tw-text-5xl tw-font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="tw-bg-gray-900 tw-py-16 tw-text-left">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h2 className="tw-text-4xl tw-font-bold tw-text-white">Introduction</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            Welcome to [Your Company Name]. We are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Information We Collect</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Personal Information: We may collect personal information such as your name, email address, and contact details when you register or interact with our site.</li>
            <li>Usage Data: We collect information about how you use our website, including your IP address, browser type, and pages visited.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">How We Use Your Information</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>To Provide Services: We use your information to deliver and improve our services.</li>
            <li>Communication: We may use your contact information to send updates, newsletters, and promotional materials.</li>
            <li>Analytics: We analyze usage data to enhance user experience and website performance.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Sharing Your Information</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Third-Party Services: We may share your information with trusted third-party service providers to assist in delivering our services.</li>
            <li>Legal Compliance: We may disclose your information if required by law or to protect our rights.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Security</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            We implement security measures to protect your information from unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Your Rights</h2>
          <ul className="tw-text-lg tw-text-gray-400 tw-mt-4">
            <li>Access: You have the right to request access to the personal information we hold about you.</li>
            <li>Correction: You can request corrections to your personal information if it is inaccurate.</li>
            <li>Deletion: You may request the deletion of your personal information under certain circumstances.</li>
          </ul>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Changes to This Policy</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.
          </p>

          <h2 className="tw-text-4xl tw-font-bold tw-text-white tw-mt-8">Contact Us</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            If you have any questions or concerns about this Privacy Policy, please contact us at [Your Contact Information].
          </p>
        </div>
      </section>
      <Footer domain={domain} />
    </>
  );
};


export default Privacy;