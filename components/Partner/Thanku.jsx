import Image from 'next/image'

export default function Thanku({domain,emailCode}) {
    return (
        <>
            {/* Start:: Thank you message */}
            <div className="col-xl-6 offset-xl-3 tw-text-center ">
                <Image 
                    src="https://cdn.vnoc.com/background/contrib/handshake.png"
                    width={150}
                    height={150}
                    alt=""
                    className='d-inline-flex img-fluid mb-3'
                />
                <h2 className='mb-4 tw-text-blue-300 tw-text-3xl tw-font-medium'>Thank you for your <br /> Partnership Application!</h2>
                <div className='tw-text-gray-500'>
                <p>You are now minutes away to joining {domain} team. All you need to do right now is click the link in the Verification email that we have just sent you. If you still haven&apos;t received it, please check your spam inbox. Your verification link will redirect you to our Marketplace hub where you can login and check out your application status.</p>
                <p className='mb-4'>You can now take part in actually building out an asset by sending proposals, partnering with brands, joining teams.</p>
                </div>
                <div className="d-grid">
                    <a href={"https://www.contrib.com/account/autologinforms?email="+emailCode+"&form=partnership"} target='_blank' className="btn btn-primary py-3">
                        Go to your contrib account
                    </a>
                </div>
            </div>
        </>
    )
}
