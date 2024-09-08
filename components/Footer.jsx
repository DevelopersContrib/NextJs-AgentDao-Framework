import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faBookmark,faBook,faCube } from '@fortawesome/free-solid-svg-icons'

const Footer = ({domain}) => {
  
  return (
    <footer className="tw-text-white tw-bg-black tw-py-6 px-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6">
            &copy; {new Date().getFullYear()} {domain}. All Rights Reserved.
          </div>
          <div className="col-xl-6 text-md-end">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item">
                <Link href="/" className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faHouse} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    home
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/about" className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faBookmark} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    about us
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/terms" className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faBook} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    terms
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/privacy" className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faCube} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    privacy
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faBookmark} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    Build
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faBookmark} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    invest
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faBookmark} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    manage
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-capitalize tw-text-white tw-inline-flex tw-items-center hover:tw-text-white/75">
                  <FontAwesomeIcon icon={faBookmark} className="tw-w-4 tw-h-4 tw-mr-2" />
                  <span>
                    monetize
                  </span>
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