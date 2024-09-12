/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Navigation from '../components/Navigation';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { getData, getDomain, getScript } from '../lib/data';
import ScriptLoader from '../components/ScriptLoader';
import './custom.css';

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
      <Navigation domain={domain} />
      <section 
        className="container-style" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgb(255, 222, 89), rgb(12, 192, 223) 30%, rgba(255, 222, 89, 0)), url('${background}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container d-flex1 align-items-center justify-content-center">
          <div className="row w-100 d-flex1 align-items-center justify-content-center">
            <div 
              className="col-lg-10 justify-content-center align-items-start left-col-style"
            >
              <div className="custom-v-padding text-center ps-3">
                <Logo domain={domain} logo={c.data.logo} />
                <p className="mt-0 hero-lead">
                  <span className="text-capitalize">{domain}</span> is part of the AgentDao framework, a network of autonomous smart agents built on URLs that build, manage, and monetize a network of specialized and personalized agents.
                </p>
                <div className="d-flex align-items-center text-center mx-auto" style={{width:'380px'}}>
                  <div className="d-flex me-3">
                    <img 
                      alt="User 1" 
                      className="rounded-circle border border-white" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user1.jpg"
                    />
                    <img 
                      alt="User 2" 
                      className="rounded-circle border border-white ms-n3" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user2.jpg"
                    />
                    <img 
                      alt="User 3" 
                      className="rounded-circle border border-white ms-n3" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user3.jpg"
                    />
                    <img 
                      alt="User 4" 
                      className="rounded-circle border border-white ms-n3" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user4.jpg"
                    />
                    <img 
                      alt="User 5" 
                      className="rounded-circle border border-white ms-n3" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user5.jpg"
                    />
                    <img 
                      alt="User 6" 
                      className="rounded-circle border border-white ms-n3" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user6.jpg"
                    />
                    <img 
                      alt="User 7" 
                      className="rounded-circle border border-white ms-n3" 
                      style={{ width: "40px", height: "40px", objectFit: "cover" }} 
                      src="https://cdn.vnoc.com/images/users/user7.jpg"
                    />
                  </div>
                  <div className="ps-2">
                    <p className="mb-0 small">Trusted by</p>
                    <p className="mb-0 fw-bold"><span>18,000</span> +</p>
                  </div>
                </div>
                <div className="mt-4">
                  <img 
                    src="https://agentdao.com/images/logo/logo-AgentDao-onblack.svg" 
                    alt="AgentDao Logo" 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>            
          </div>
        </div>
      </section>
      <ScriptLoader html={html.data.content} />
      <SectionTwo domain={domain} />
      <SectionThree />
      <Footer domain={domain} />
    </>
  );
}
