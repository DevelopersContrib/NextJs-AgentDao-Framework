/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Navigation from '../components/Navigation';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import SectionFour from '../components/SectionFour';
import Ai from '../components/Ai';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { getData, getDomain, getScript } from '../lib/data';
import ScriptLoader from '../components/ScriptLoader';
import Script from 'next/script';
import './custom.css';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Revenue from "@/components/Revenue";
import Cta from "@/components/Cta";

export default async function Home() {
  const c = await getData();
  const domain = getDomain();
  const background = c.data.background_url !== null 
    ? c.data.background_url 
    : 'https://cdn.vnoc.com/images/agent-bg.png';

  const html = await getScript(
    "https://e7lq80c199.execute-api.us-west-2.amazonaws.com/api1?key=5c1bde69a9e783c7edc2e603d8b25023&request=getcontent&url=" 
    + encodeURIComponent(domain)
  );

  return (
    <>
      <Header />    
      <Hero />
      <Features />
      <Revenue />
      <SectionThree />
      <Cta />
      <Footer domain={domain} />
    </>
  );
}
