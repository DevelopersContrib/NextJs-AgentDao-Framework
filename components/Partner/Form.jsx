"use client";

import { useState, useEffect } from "react";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import LoadingState from '../LoadingState';

export default function PartnerForm ({domain, countries, setSuccess, setEmailCode}) {
  const initialValues = {
    domain:domain,
    step: 1,
  
    //Step 1
    partnershiptype:"",
    fname:"",
    lname:"",
    email:"",
    password:"",
    cpassword:"",
    message:"",
  
    //Step 2
    website: "",
    phone: "",
    country: countries[0].country_id,
    country_text: countries[0].name,
    city: "",
  
    //Step 3
    companytitle: "",
    companydesc: "",
    companyimg: "",
    companylink: "",
    isLoading: false,
    newSuccess: true,
    newMsgSuccess: false,
    emailcode:''
  };

  const initialErrors = {
    //Error Msg Step1
    validate:false,
    partnershiptypeError:"",
    fnameError:"",
    lnameError:"",
    emailError:"",
    passwordError:"",
    cpasswordError:"",
    messageError:"",
  
    //Error Msg Step2
    websiteError: "",
    phoneError: "",
    countryError: "",
    cityError: "",
  
    //Error Msg Step3
    companytitleError: "",
    companydescError: "",
    companyimgError: "",
    companylinkError: "",

  };

  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [emailExist, setEmailExist] = useState('');

  useEffect(() => {
    const validateErrors = () => {
      let dataErrors;
      if(data.step===1){
        dataErrors = {
          partnershiptypeError: data.partnershiptype?'':"Partnership Type is required.",
          fnameError: data.fname?'':"First name is required.",
          lnameError: data.lname?'':"Last name is required.",
          emailError: (data.email?'':"Email is required") || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ?"":"Invalid Email"),
          passwordError: (data.password?'':"Password is required.") || (data.password.length <6?'Password has less than 5 characters.':''),
          cpasswordError: (data.cpassword?'':"Confirm password is required.") || (data.password!==data.cpassword?'Confirm password did not match.':""),
          messageError: data.message?'':"Message is required."
        }
      }else if(data.step===2){
        dataErrors = {
          websiteError: (data.website?'':"Website is required.") || (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(data.website)?"":"Invalid website."),
          phoneError: (data.phone?'':"Phone is required.") || (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/g.test(data.phone)?"":"Invalid Phone."),
          countryError: data.country?'':"Country is required.",
          cityError: data.city?'':"City is required."
        }
      }else if(data.step===3){
        dataErrors = {
          companytitleError: data.companytitle?'':"Company Title is required.",
          companydescError: data.companydesc?'':"Company description is required."
        }
      }
      setErrors(dataErrors);
    }
    validateErrors()
  }, [data]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeCountry = (e) => {
    setData(prevData => {
      return {...prevData, ...{
        country:e.target.value,
        country_text:e.target.options[e.target.selectedIndex].text
      }};
    });
  };

  const emailKeyPress = (e) => {
    setEmailExist('')
  }

  const prevStep = event => {
    event.preventDefault();
    setData({ ...data, ['step']: data.step -1});
	}

  const handleSubmit = async(event) => {
		event.preventDefault();
		const isValid = !Object.values(errors).some(v => v);
   
    if(isValid && data.step===3){
      
      setData({ ...data, ['isLoading']: true});
      try {
        const response = await fetch("/api/partner", {
          method: "POST",
          body: JSON.stringify(data),
        });
        setData({ ...data, ['isLoading']: false});
        if (response.ok) {
          const res = await response.json()
          
          if(res.status){
            setSuccess(true);
            setEmailCode(res.code);
            console.log('done....')
          }else{
            setData({ ...data, ['step']: 1});
            setEmailExist(res.error);
          }
          
        }else{
          alert('An error occurred')
        }
      } catch (error) {
        console.log(error);
      } finally {
        //set
      }
		}else if(isValid){
      setErrors({ ...errors, ['validate']: true })
      setData({ ...data, ['step']: data.step +1});
    }else{
      setErrors({ ...errors, ['validate']: true })
    }
	}

  const showStep = () => {
    const step = data.step;
    if(step===1){
      return (
        <Step1 
          domain={domain} data={data} err={errors} handleSubmit={handleSubmit} 
          handleChange={handleChange} emailExist={emailExist} emailKeyPress={emailKeyPress}/>
      )
    }else if(step === 2){
      return (
        <Step2 
          data={data} err={errors} handleSubmit={handleSubmit} 
          handleChange={handleChange} handleChangeCountry={handleChangeCountry} prevStep={prevStep}
          countries={countries}
          />
      )
    }else if(step===3){
      return(
        <Step3 data={data} err={errors} handleSubmit={handleSubmit} handleChange={handleChange} prevStep={prevStep}/>
      )
    }
  }

  return (
    <div className="tw-flex-[0_0_50%] tw-p-12">
      {
        data.isLoading ? (
          <LoadingState />
        ): showStep()
      }
    </div>
  )
};