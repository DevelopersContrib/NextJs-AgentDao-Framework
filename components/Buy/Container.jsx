"use client";

import { useState} from "react";
import Image from 'next/image'
import Logo from '../../components/Logo';
import Form from "./Form";
import Thanku from "./Thanku";

const Container = ({domain, logo, countries}) => {
const [success, setSuccess] = useState(false);
  
  return (
    <section 
      className="tw-min-h-[calc(100vh-56px-74px)] tw-relative tw-py-12 tw-flex tw-w-full tw-items-center tw-bg-white"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12 tw-text-center">
            <Logo domain={domain} logo={logo} />
          </div>

          {success ? <Thanku />: <Form domain={domain} countries={countries} setSuccess={setSuccess}/>}

          <div className="col-xl-12 py-5">
            <hr />
          </div>
          <div className="col-xl-12">
            <div className="row gy-5">
              <div className="col-xl-6 tw-flex">
                <div className="row tw-items-center">
                  <div className="col-xl-8 text-xl-end">
                    <h4 className="tw-text-2xl tw-font-medium">Select Your Domain</h4>
                    <p className="small">Search Ecorp&apos;s database for the ultimate domain name for your business, project or brand.</p>
                  </div>
                  <div className="col-xl-4">
                    <Image
                      src='https://cdn.vnoc.com/icons/domain.jpg'
                      width={300}
                      height={300}
                      alt=""
                      className='img-fluid tw-rounded-full'
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 tw-flex">
                <div className="row tw-items-center">
                  <div className="col-xl-4">
                    <Image
                      src='https://cdn.vnoc.com/icons/offer.jpg'
                      width={300}
                      height={300}
                      alt=""
                      className='img-fluid tw-rounded-full'
                    />
                  </div>
                  <div className="col-xl-8">
                    <h4 className="tw-text-2xl tw-font-medium">Submit your best offer</h4>
                    <p className="small">We&apos;ll let you know if it&apos;s too low for consideration.</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 tw-flex">
                <div className="row tw-items-center">
                  <div className="col-xl-8 text-xl-end">
                    <h4 className="tw-text-2xl tw-font-medium">Agree to the terms</h4>
                    <p className="small">Once the price is decided, agree to the terms of the domain name sales agreement.</p>
                  </div>
                  <div className="col-xl-4">
                    <Image
                      src='https://cdn.vnoc.com/icons/agreement.jpg'
                      width={300}
                      height={300}
                      alt=""
                      className='img-fluid tw-rounded-full'
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 tw-flex">
                <div className="row tw-items-center">
                  <div className="col-xl-4">
                    <Image
                      src='https://cdn.vnoc.com/icons/transfer.jpg'
                      width={300}
                      height={300}
                      alt=""
                      className='img-fluid tw-rounded-full'
                    />
                  </div>
                  <div className="col-xl-8">
                    <h4 className="tw-text-2xl tw-font-medium">Launch your website</h4>
                    <p className="small">Once payment has been confirmed the owner will transfer the domain to you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Container