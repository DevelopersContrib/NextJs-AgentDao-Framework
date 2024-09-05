"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import LoadingState from '../LoadingState';
import ErrorBlock from '../ErrorBlock';

function BuyForm({domain, countries, setSuccess}) {
	const initialValues = {
		isLoading:false,
		domain:domain,
		amount: 10000,
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		country_id: countries[0].country_id,
		country: countries[0].name,
		phone: "",
		message: "",
		contactBy: ""
	}

	const initialErrors = {
		validate:false,
		amountError: "",
		firstNameError: "",
		lastNameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
		countryError: "",
		phoneError: "",
		isValidPhone: false,
		messageError: "",
		contactByError: "",
	};
    
	const [data, setData] = useState(initialValues);
	const [errors, setErrors] = useState(initialErrors);

	useEffect(() => {
		const validateErrors = () => {
			const dataErrors = {
				amountError: (data.amount?'':"Amount is required.") || (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/g.test(data.amount)?"":"Invalid Amount."),
				firstNameError: data.firstName?'':"First name is required.",
				lastNameError: data.lastName?'':"Last name is required.",
				emailError: (data.email?'':"Email is required") || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? "":"Invalid Email"),
				passwordError: data.password?'':"Password is required.",
				confirmPasswordError: (data.confirmPassword?'':"Confirm password is required.") || (data.password!==data.confirmPassword?'Confirm password did not match.':""),
				countryError: data.country_id?'':"Country is required.",
				phoneError: (data.phone?'':"Phone is required.") || (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/g.test(data.phone)?"":"Invalid Phone."),
				messageError: data.message?'': "Message is required.",
				contactByError: data.contactBy?'': "Contact method is required.",
			}
			setErrors(dataErrors);
		}
		validateErrors()
	}, [data]);
      
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    const countryChange = (e) => {
		const val = e.target.value.split('::')
		setData(prevData => {
			return {...prevData, ...{
				[e.target.name] : val[0],
				'country' : e.target.options[e.target.selectedIndex].text,
				'phone' : val[1],
				'phoneCode' : val[1]
			}};
		});
	};

	const contactByChange = event => {
		setData(prevData => {
			return {...prevData, ...{
				'contactBy' : event.target.options[event.target.selectedIndex].value,
			}};
		});
	}
  
	const handleSubmit = async(event) => {
		event.preventDefault();

		const isValid = !Object.values(errors).some(v => v);
		setErrors({ ...errors, ['validate']: true })
    if(isValid ){
      setData({ ...data, ['isLoading']: true});
      try {
				console.log('submit')
        const response = await fetch("/api/buy", {
          method: "POST",
          body: JSON.stringify(data),
        });

        setData({ ...data, ['isLoading']: false});
        
				if (response.ok) {
          const res = await response.json()
          
          if(res.status){
            setSuccess(true);
            console.log('done....')
          }
          
        }else{
          alert('An error occurred')
        }
      } catch (error) {
        console.log(error);
      } finally {
        //set
      }
		}
	}

	const showStep = () => {
		return(
			<div className="col-xl-12 ">
				<div className="tw-flex tw-flex-col lg:tw-flex-row tw-w-full mb-3">
					<div className="tw-flex-[0_0_50%] tw-p-12">
						{/* Start:: Step 1 */}
						<div className="row">
							<div className="col-xl-12 tw-text-center mb-3">
								<h2 className="tw-text-3xl tw-font-medium">Partner with {domain} today</h2>
								<p>
										Create your Profile to make a partnership
								</p>
							</div>
							<div className="col-xl-12">
								<div className="mb-3">
									<label htmlFor="" className='form-label'>Amount <span className="text-danger">*</span></label>
									<input type="text" name="amount" value={data.amount} onChange={handleChange} className="form-control form-control-lg" />
									{errors.validate? (<ErrorBlock msg={errors.amountError} />): null}
								</div>
								<div className="row">
										<div className="col-xl-6 mb-3">
											<label htmlFor="" className='form-label'>First Name <span className="text-danger">*</span></label>
											<input name="firstName" value={data.firstName} onChange={handleChange} type="text" className="form-control form-control-lg" />
											{errors.validate? (<ErrorBlock msg={errors.firstNameError} />): null}
										</div>
										<div className="col-xl-6 mb-3">
											<label htmlFor="" className='form-label'>Last Name <span className="text-danger">*</span></label>
											<input name="lastName" value={data.lastName} onChange={handleChange} type="text" className="form-control form-control-lg" />
											{errors.validate? (<ErrorBlock msg={errors.lastNameError} />): null}
										</div>
								</div>
								<div className="mb-3">
										<label htmlFor="" className='form-label'>Email Address <span className="text-danger">*</span></label>
										<input type="text" name="email" value={data.email} onChange={handleChange} className="form-control form-control-lg" />
										{errors.validate? (<ErrorBlock msg={errors.emailError} />): null}
								</div>
								<div className="row">
										<div className="col-xl-6 mb-3">
												<label htmlFor="" className='form-label'>Password <span className="text-danger">*</span></label>
												<input type="password" name="password" value={data.password} onChange={handleChange} className="form-control form-control-lg" />
												{errors.validate? (<ErrorBlock msg={errors.passwordError} />): null}
										</div>
										<div className="col-xl-6 mb-3">
												<label htmlFor="" className='form-label'>Confirm Password <span className="text-danger">*</span></label>
												<input type="password" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} className="form-control form-control-lg" />
												{errors.validate? (<ErrorBlock msg={errors.confirmPasswordError} />): null}
										</div>
								</div>
								<div className="row">
										<div className="col-xl-6 mb-3">
										<   label htmlFor="" className='form-label'>Choose Country <span className="text-danger">*</span></label>
												<select name="country_id" value={data.country_id+'::'+data.phoneCode} onChange={countryChange} className="form-select form-select-lg">
														{countries.map(country=><option key={country.country_id} value={country.country_id+'::'+country.phone_code}>{country.name}</option>)}
												</select>
												{errors.validate? (<ErrorBlock msg={errors.countryError} />): null}
										</div>
										<div className="col-xl-6 mb-3">
												<label htmlFor="" className='form-label'>Phone <span className="text-danger">*</span></label>
												<input name="phone" value={data.phone} onChange={handleChange} type="text" className="form-control form-control-lg" />
												{errors.validate? (<ErrorBlock msg={errors.phoneError} />): null}
										</div>
								</div>
								<div className="mb-3">
										<label htmlFor="" className='form-label'>How do you wish to be contacted? <span className="text-danger">*</span></label>
										<select name="contact_by" value={data.contactBy} onChange={contactByChange} className="form-select form-select-lg">
												<option value=""></option>
												<option value="SMS">SMS</option>
												<option value="Email">Email</option>
										</select>
										{errors.validate? (<ErrorBlock msg={errors.contactByError} />): null}
								</div>
								<div className="mb-3">
										<label htmlFor="" className='form-label'>Message <span className="text-danger">*</span></label>
										<textarea name="message" value={data.message} onChange={handleChange} rows="3" className="form-control form-control-lg"></textarea>
										{errors.validate? (<ErrorBlock msg={errors.messageError} />): null}
								</div>
								<div className="mb-3 d-grid">
										<a href="" className="btn btn-primary py-3" onClick={handleSubmit}>
										Submit
										</a>
								</div>
								<div className="text-center">
										<Link href="/partner" className="tw-no-underline">
										Or you can partner this domain!
										</Link>
								</div>
							</div>
						</div>
					</div>
						<div className="tw-flex-[0_0_50%] tw-bg-[#eaeaea] tw-p-12 tw-flex tw-justify-center tw-items-center tw-flex-col">
						<h2 className="mb-4 tw-text-center tw-text-4xl tw-font-medium">
							A great domain name is a great asset
						</h2>
						<p className='tw-text-center'>
							Invest in a great domain name as part of your brand strategy and take your business to the next level
						</p>
						<ul className="list-unstyled">
							<li>
								<div className='tw-inline-flex tw-items-center'>
										<FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-mr-2 tw-text-blue-500' /> Secure your online identity
								</div>
							</li>
							<li>
								<div className='tw-inline-flex tw-items-center'>
									<FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-mr-2 tw-text-blue-500' /> Enhance your brand equity
								</div>
							</li>
							<li>
								<div className='tw-inline-flex tw-items-center'>
								<FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-mr-2 tw-text-blue-500' /> Boost your credibility
								</div>
							</li>
							<li>
								<div className='tw-inline-flex tw-items-center'>
								<FontAwesomeIcon icon={faCheck} className='tw-w-4 tw-h-4 tw-mr-2 tw-text-blue-500' /> Improve conversion rates
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

  return (
		<>
			{ data.isLoading ? <LoadingState />  : (showStep())}
		</>
  )
}

export default BuyForm