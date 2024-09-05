import ErrorBlock from '../ErrorBlock';

export default function Step1({data, err, handleSubmit, handleChange, prevStep}) {
    return (
        <>
          {/* Start:: Step 3 */}
          <div className="row">
              <div className="col-xl-12 tw-text-center mb-3">
                <h2 className='tw-text-3xl tw-font-medium'>Complete your Offer</h2>
                <p>
                Please complete your profile in order to present your partnership to the domain owner.*
                </p>
              </div>
              <div className="col-xl-12">
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Company Title <span className="text-danger">*</span>
                  </label>
                  <input name="companytitle"  onChange={handleChange} value={data.companytitle} type="text" className="form-control form-control-lg" />
                  {err.validate? (<ErrorBlock msg={err.companytitleError} />): null}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Company Description <span className="text-danger">*</span>
                  </label>
                  <textarea name="companydesc"  onChange={handleChange} value={data.companydesc} rows="3" className="form-control form-control-lg"></textarea>
                  {err.validate? (<ErrorBlock msg={err.companydescError} />): null}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Company Image URL <small>( https:// )</small>
                  </label>
                  <input name="companyimg"  onChange={handleChange} value={data.companyimg} type="text" className="form-control form-control-lg" />
                  {err.validate? (<ErrorBlock msg={err.companyimgError} />): null}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Company URL <small>( https:// )</small>
                  </label>
                  <input name="companylink"  onChange={handleChange} value={data.companylink} type="text" className="form-control form-control-lg" />
                  
                  {err.validate? (<ErrorBlock msg={err.companylinkError} />): null}
                </div>
                <div className="mb-5">
                  <p className="mb-0 small">
                  By clicking the button below, I understand that the offer that I am about to submit is binding and I agree to Ecorp domain name sales and rental terms.
                  </p>
                </div>
                {/*
                  err.submitError?(
                    <div className="mb-5">
                      <div className="d-block text-danger small mt-2">
                          {err.submitError}
                      </div>
                    </div>
                  ):null*/
                }
                <div className="d-grid tw-grid-cols-2 tw-gap-4">
                  <a href="" className="btn btn-light border py-3" onClick={prevStep}>BACK</a>
                  <a href="" className="btn btn-primary py-3" onClick={handleSubmit} >SUBMIT</a>
                </div>
              </div>
            </div>
        </>
    )
}