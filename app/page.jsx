import Link from "next/link";
import Navigation from '../components/Navigation';
import SectionTwo from "../components/SectionTwo";
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { getData, getDomain, getScript } from '../lib/data';
import Ai from '../components/Ai';
import ScriptLoader from '../components/ScriptLoader';

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

  const containerStyle = {
    backgroundImage: `url('${background}')`,
    backgroundColor: '#000',
    backgroundSize: 'cover',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const leftColStyle = {
    borderRight: "1px solid #353532"
  };

  const customVPaddingStyle = {
    padding: '15rem 0rem'
  };

  return (
    <>
      <Navigation domain={domain} />
      <section style={containerStyle}>
        <div className="container-fluid">
          <div className="row">
            <div 
              className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5" 
              style={leftColStyle}
            >
              <div style={customVPaddingStyle}>
                <div className="text-center mb-4">
                  <Logo domain={domain} logo={c.data.logo} />
                </div>
                <p className="text-center">
                  is part of the AgentDao framework, a network of autonomous smart agents built on URLs that build, manage, and monetize a network of specialized and personalized agents.
                </p>
              </div>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center py-5">
              <Ai />
            </div>
          </div>
        </div>
      </section>
      <ScriptLoader html={html.data.content} />
      <SectionTwo domain={domain} />
      <Footer domain={domain} />
    </>
  );
}
