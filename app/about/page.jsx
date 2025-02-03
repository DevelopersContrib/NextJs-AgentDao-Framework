import Script from 'next/script';
import { getDomain } from '../../lib/data';

import Header from '@/components/Header';
import Features from '@/components/Features';
import Revenue from '@/components/Revenue';
import Cta from '@/components/Cta';
import FomoPopup from '@/components/TokenSalePopup';
import Footer from '@/components/Footer';

const About = () => {
  const domain = getDomain();

  return (
    <>
      <Header />

      <section className="tw-bg-black tw-text-white tw-py-16 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h1 className="tw-text-5xl tw-font-bold">About Our Platform</h1>
          <p className="tw-text-xl tw-mt-4">
            Transforming digital assets into smart, autonomous entities.
          </p>
        </div>
      </section>

      <section className="tw-bg-gray-900 tw-py-16 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h2 className="tw-text-4xl tw-font-bold tw-text-white">Our Agents</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            Explore our diverse range of agents designed to enhance productivity.
          </p>
          <Features />
        </div>
      </section>

      <section className="tw-bg-gray-800 tw-py-16 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h2 className="tw-text-4xl tw-font-bold tw-text-white">Revenue Potential</h2>
          <p className="tw-text-lg tw-text-gray-400 tw-mt-4">
            Discover the revenue opportunities with our platform.
          </p>
          <Revenue />
        </div>
      </section>

      <section className=" tw-text-white tw-py-16 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4">
          <h2 className="tw-text-4xl tw-font-bold">Join Us</h2>
          <p className="tw-text-lg tw-mt-4">
            Be part of the future of decentralized ownership and autonomous ventures.
          </p>
          <Cta />
        </div>
      </section>

      <FomoPopup />
      <Footer domain={domain} />
    </>
  );
};

export default About;