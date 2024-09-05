import Script from 'next/script';
import { getDomain } from '../../lib/data';

const Staffing = () => {
  const domain = getDomain();
  return (
    <>
        <Script src={"https://tools.contrib.com/pages/staffing?d="+domain+"&container=staffing-script"}/>
        <div className="staffing-script"></div>
    </>
   
  )
}

export default Staffing