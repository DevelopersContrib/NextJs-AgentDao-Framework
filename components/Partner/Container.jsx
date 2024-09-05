"use client";

import { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

import Logo from '../Logo';
import Form from './Form';
import Thanku from './Thanku';

const Container = ({domain, logo, countries}) => {
  const [emailCode, setEmailCode] = useState('');
  const [success, setSuccess] = useState(false);
  
  return (
    <section 
      className="tw-min-h-[calc(100vh-56px-74px)] tw-relative tw-py-12 tw-flex tw-w-full tw-items-center tw-bg-white"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12 tw-text-center">
            <Logo domain={domain} logo={logo}/>
          </div>
          {
            !success ? (
              <>
                {/* Start:: Partner Forms */}
                <div className="col-xl-12">
                  <div className="tw-flex tw-flex-col lg:tw-flex-row tw-w-full mb-3">
                    <div className="tw-flex-[0_0_50%] tw-bg-[#eaeaea] tw-p-12 tw-flex tw-justify-center tw-flex-col">
                      <h2 className="text-lg-end mb-4 tw-text-3xl tw-font-medium">
                        Invest in a great domain name as part of your brand strategy and take your business to the next level
                      </h2>
                      <div className="row">
                        <div className="col-xl-7 text-xl-end">
                          <ul className="list-unstyled">
                            <li>
                              <div className='tw-inline-flex tw-items-center'>
                                Secure your online identity <FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-ml-2' />
                              </div>
                            </li>
                            <li>
                              <div className='tw-inline-flex tw-items-center'>
                              Enhance your brand equity <FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-ml-2' />
                              </div>
                            </li>
                            <li>
                              <div className='tw-inline-flex tw-items-center'>
                              Boost your credibility <FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-ml-2' />
                              </div>
                            </li>
                            <li>
                              <div className='tw-inline-flex tw-items-center'>
                              Improve conversion rates <FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-ml-2' />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-xl-5">
                          <Image 
                            src="https://cdn.vnoc.com/icons/login-800x800.jpg" 
                            alt=""
                            width={300}
                            height={300}
                            className='img-fluid tw-rounded-full'
                          />
                        </div>
                      </div>
                    </div>
                    <Form domain={domain} countries={countries} setSuccess={setSuccess} setEmailCode={setEmailCode}  />
                  </div>
                </div>
              </>
            ):null
          }          
          {success ? <Thanku domain={domain} emailCode={emailCode}/>: null}
        </div>
      </div>
    </section>
  )
}

export default Container