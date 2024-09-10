import Link from "next/link"

const Footer = ({ domain }) => {
  return (
    <footer className="tw-text-white tw-bg-black tw-py-6 px-3">
      <div className="container-fluid">
        {/* New Top Section */}
        <div className="row mb-5 pt-5">
          <div className="col-md-3">
            <div className="text-capitalize fs-3">{domain}</div>
            <p className="mt-3">
              Is a part of the AgentDao framework, providing specialized and personalized agent solutions.
            </p>
          </div>
          <div className="col-md-3">
            <h5>About</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/about" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  About
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Community</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/contact" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partner" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  Partner
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/terms" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="tw-no-underline tw-text-white hover:tw-text-white/75">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6">
            &copy; {new Date().getFullYear()} {domain}. All Rights Reserved.
          </div>
          <div className="col-xl-6 text-md-end">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item">
                <Link href="/" className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  home
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/about" className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  about us
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/terms" className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  terms
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/privacy" className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  privacy
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  Build
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  invest
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  manage
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white hover:tw-text-white/75">
                  monetize
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
