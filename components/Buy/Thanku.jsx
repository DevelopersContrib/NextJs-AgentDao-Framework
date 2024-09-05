import Image from 'next/image'
import { faSearch, faFile, faDesktop, faArrowAltCircleRight, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Thanku() {
	return (
		<>
			{/* Start:: Thank you message */}
			<div className="col-xl-9 offset-xl-1 tw-text-center">
				<Image 
					src="https://cdn.vnoc.com/icons/icon-thankyou-800x400.png"
					width={300}
					height={300}
					alt=""
					className='d-inline-flex img-fluid mb-3'
				/>
				<h2 className='mb-4 tw-text-blue-300 tw-text-3xl tw-font-medium'>for submitting your offer.</h2>
				<div className='tw-text-gray-500 mb-4'>
				<p className='mb-2'>
					<FontAwesomeIcon icon={faArrowAltCircleRight} className='tw-w-4 tw-h-4 tw-inline-flex me-2' />
					You will be receiving three (3)-emails from Contrib.
				</p>
				<p className='mb-4'>
					<FontAwesomeIcon icon={faArrowAltCircleRight} className='tw-w-4 tw-h-4 tw-inline-flex me-2' />
					Please check your spam box for safe measure.
				</p>
				<p className="text-center mb-4">
					contrib is our contribution platform and it allows us to get people to help contribute, <br /> make offer or partner with premium world class brands. You could check your Offer submission in your <br /> <b>&quot;My Offers Contrib App&quot;</b>.
				</p>
				<p className='h4'>
					<FontAwesomeIcon icon={faEnvelope} className='tw-w-6 tw-h-6 tw-inline-flex me-2' />
					Please check your email for your Contrib access.
				</p>
				</div>
				<div className="tw-bg-gray-100 tw-p-12 tw-rounded">
					<div className="row tw-text-center">
						<div className="col-xl-12 mb-4">
							<h2 className='tw-text-3xl tw-font-medium'>How It Works?</h2>
						</div>
					</div>
					<div className='row gx-xl-5'>
						<div className="col-xl-4">
							<div className='tw-inline-flex tw-justify-center mb-3'>
								<FontAwesomeIcon icon={faSearch} className='tw-w-8 tw-h-8 tw-inline-flex' />
							</div>
							<h3 className='tw-text-3xl tw-font-medium'>
									Step 1
							</h3>
							<h5 className='tw-text-2xl tw-font-medium'>
									Browse the Marketplace
							</h5>
							<p className="small">
									Browse the marketplace and search for sites to submit offers.
							</p>
							</div>
							<div className="col-xl-4">
								<div className='tw-inline-flex tw-justify-center mb-3'>
										<FontAwesomeIcon icon={faFile} className='tw-w-8 tw-h-8 tw-inline-flex' />
								</div>
								<h3 className='tw-text-3xl tw-font-medium'>
										Step 2
								</h3>
								<h5 className='tw-text-2xl tw-font-medium'>
								Submit an Offer
								</h5>
								<p className="small">
								Click on sumbit offer and fill up the form.
								</p>
							</div>
							<div className="col-xl-4">
								<div className='tw-inline-flex tw-justify-center mb-3'>
										<FontAwesomeIcon icon={faDesktop} className='tw-w-8 tw-h-8 tw-inline-flex' />
								</div>
								<h3 className='tw-text-3xl tw-font-medium'>
										Step 3
								</h3>
								<h5 className='tw-text-2xl tw-font-medium'>
								View Offers
								</h5>
								<p className="small">
								View all your offer applications that you have submitted to here.
								</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
