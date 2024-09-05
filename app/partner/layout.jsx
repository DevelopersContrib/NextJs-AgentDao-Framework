
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { getDomain } from '../../lib/data';

export default function PartnerLayout({ children }) {
  const domain = getDomain()
  return (
    <>
      <Navigation domain={domain} />
      {children}
      <Footer domain={domain} />
    </>
  )
}
