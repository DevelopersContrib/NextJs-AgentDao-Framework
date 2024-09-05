import Link from "next/link"
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
  const background = c.data.background_url!==null?c.data.background_url:'https://cdn.vnoc.com/background/tech4.jpg';
  const html = await getScript("https://e7lq80c199.execute-api.us-west-2.amazonaws.com/api1?key=5c1bde69a9e783c7edc2e603d8b25023&request=getcontent&url=" + encodeURIComponent(domain))
	
  return (
    <>
      <Navigation domain={domain} />
      <section 
        style={{ backgroundImage: `url('${background}')` }}
        className="tw-min-h-[calc(100vh-56px-74px)] tw-bg-cover tw-bg-no-repeat tw-relative tw-text-white tw-bg-[50%] tw-py-12 tw-flex tw-w-full tw-items-center"
      >
        <div className="tw-bg-[rgba(3,38,51,0.85)] tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-absolute"></div>
        <div className="container tw-relative">
          <div className="row tw-mb-8">
            <div className="col-xl-12 tw-text-center">
              <Logo domain={domain} logo={c.data.logo} />
            </div>
          </div>          
          <Ai />                    
        </div>
      </section>
      <ScriptLoader html={html.data.content} />
      <SectionTwo domain={domain} />
      <Footer domain={domain} />
    </>
  )
}
