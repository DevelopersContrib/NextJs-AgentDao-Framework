import Link from "next/link";
import ErrorBlock from '../ErrorBlock';

export default function Step1({domain, data, err, handleSubmit, handleChange, emailExist, emailKeyPress}) {
    return (
        <>
            {/* Start:: Step 1 */}
            <div className="row ">
                <div className="col-xl-12 tw-text-center mb-3">
                <h2 className="tw-text-3xl tw-font-medium">Partner with {domain} today</h2>
                <p>
                Create your Profile to make a partnership
                </p>
                </div>
                <div className="col-xl-12">
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Partnership Type <span className="text-danger">*</span></label>
                    <select name="partnershiptype"  onChange={handleChange} value={data.partnershiptype} className="form-select form-select-lg">
                    <option></option>
                    <option value="Sponsorship Marketing Partnerships">Sponsor Marketing Partnerships</option>
                    <option value="Distribution Marketing Partnerships">Distribution Marketing Partnerships</option>
                    <option value="Affiliate Marketing Partnerships">Affiliate Marketing Partnerships</option>
                    <option value="Added Value Marketing Partnerships">Added Value Marketing Partnerships</option>
                    </select>
                    {err.validate? (<ErrorBlock msg={err.partnershiptypeError} />): null}
                </div>
                <div className="row">
                    <div className="col-xl-6 mb-3">
                    <label htmlFor="" className='form-label'>First Name <span className="text-danger">*</span></label>
                    <input name="fname"  onChange={handleChange} value={data.fname} type="text" className="form-control form-control-lg" />
                    {err.validate? (<ErrorBlock msg={err.fnameError} />): null}
                    </div>
                    <div className="col-xl-6 mb-3">
                    <label htmlFor="" className='form-label'>Last Name <span className="text-danger">*</span></label>
                    <input name="lname"  onChange={handleChange} value={data.lname} type="text" className="form-control form-control-lg" />
                    {err.validate? (<ErrorBlock msg={err.lnameError} />): null}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Email Address <span className="text-danger">*</span></label>
                    <input name="email" onKeyUp={emailKeyPress} onChange={handleChange} value={data.email} type="text" className="form-control form-control-lg" />
                    {err.validate? (<ErrorBlock msg={err.emailError} />): null}
                    {emailExist? (<ErrorBlock msg={emailExist} />): null}
                </div>
                <div className="row">
                    <div className="col-xl-6 mb-3">
                    <label htmlFor="" className='form-label'>Password <span className="text-danger">*</span></label>
                    <input name="password"  onChange={handleChange} value={data.password} type="password" className="form-control form-control-lg" />
                    {err.validate? (<ErrorBlock msg={err.passwordError} />): null}
                    </div>
                    <div className="col-xl-6 mb-3">
                    <label htmlFor="" className='form-label'>Confirm Password <span className="text-danger">*</span></label>
                    <input name="cpassword"  onChange={handleChange} value={data.cpassword} type="password" className="form-control form-control-lg" />
                    {err.validate? (<ErrorBlock msg={err.cpasswordError} />): null}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='form-label'>Message <span className="text-danger">*</span></label>
                    <textarea name="message"  onChange={handleChange} value={data.message} rows="3" className="form-control form-control-lg"></textarea>
                    {err.validate? (<ErrorBlock msg={err.messageError} />): null}
                </div>
                <div className="mb-3 d-grid">
                    <a href="" className="btn btn-primary py-3" onClick={handleSubmit}>
                    NEXT
                    </a>
                    
                </div>
                <div className="text-center">
                    <Link href="/buy" className="tw-no-underline">
                    Or you can buy this domain!
                    </Link>
                </div>
                </div>
            </div>
        </>
    )
}
