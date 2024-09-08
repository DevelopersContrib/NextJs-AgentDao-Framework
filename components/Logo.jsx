import Image from 'next/image'

export default function Logo({domain,logo}) {
  return(
    <>
      {
        logo ? <Image 
              src={logo}
              width={300}
              height={300}
              alt=""
              className='d-inline-flex img-fluid mb-3'
            /> : <h1 className="tw-text-5xl font-800 text-capitalize">{domain}</h1>
      }
      <p className="tw-text-2xl">
        <a href="https://contrib.com/" className="tw-no-underline text-primary">
        Proud Member of CONTRIB
        </a>
        {" "}|{" "}
        <a href="https://vnoc.com/" className="tw-no-underline text-primary">
        Powered by VNOC
        </a>
      </p>
    </>
  )
}
