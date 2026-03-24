import { getDomain } from "../../lib/data";

import Header from "@/components/Header";
import Features from "@/components/Features";
import Revenue from "@/components/Revenue";
import Cta from "@/components/Cta";
import FomoPopup from "@/components/TokenSalePopup";
import Footer from "@/components/Footer";
import AboutHero from "./AboutHero";

const About = () => {
  const domain = getDomain();

  return (
    <>
      <Header domain={domain} />
      <AboutHero />
      <Features />
      <Revenue />
      <Cta />
      <FomoPopup />
      <Footer domain={domain} />
    </>
  );
};

export default About;
