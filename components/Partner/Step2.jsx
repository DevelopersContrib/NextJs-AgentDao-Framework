import ErrorBlock from '../ErrorBlock';

export default function Step2({data, err, handleSubmit, handleChange, handleChangeCountry, prevStep, countries}) {
    return (
        <>
          {/* Start:: Step 2 */}
          <div className="row">
              <div className="col-xl-12 tw-text-center mb-3">
                <h2 className='tw-text-3xl tw-font-medium'>Complete your Partnership</h2>
                <p>
                Please complete your profile in order to present your partnership to the domain owner.
                </p>
              </div>
              <div className="col-xl-12">
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Website <small>( https:// )</small> <span className="text-danger">*</span>
                  </label>
                  <input name="website"  onChange={handleChange} value={data.website} type="text" className="form-control form-control-lg" />
                  {err.validate? (<ErrorBlock msg={err.websiteError} />): null}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Phone <span className="text-danger">*</span>
                  </label>
                  <input name="phone"  onChange={handleChange} value={data.phone} type="text" className="form-control form-control-lg" />
                  {err.validate? (<ErrorBlock msg={err.phoneError} />): null}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className='form-label'>Country <span className="text-danger">*</span>
                  </label>
                  <select name="country"  onChange={handleChangeCountry} value={data.country} className="form-select form-select-lg">
                  {countries.map(country=><option key={country.country_id} value={country.country_id}>{country.name}</option>)}
                  </select>
                  {err.validate? (<ErrorBlock msg={err.countryError} />): null}
                </div>
                <div className="mb-5">
                  <label htmlFor="" className='form-label'>City <span className="text-danger">*</span>
                  </label>
                  <input name="city"  onChange={handleChange} value={data.city} type="text" className="form-control form-control-lg" />
                  {err.validate? (<ErrorBlock msg={err.cityError} />): null}
                </div>
                <div className="d-grid tw-grid-cols-2 tw-gap-4">
                  <a href="" className="btn btn-light border py-3" onClick={prevStep}>BACK</a>
                  <a href="" className="btn btn-primary py-3" onClick={handleSubmit}>NEXT</a>
                </div>
              </div>
            </div>
        </>
    )
}