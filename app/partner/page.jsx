import Container from '../../components/Partner/Container';
import { getDomain, getData } from '../../lib/data';

const Partner = async () => {
  const domain = getDomain();
  const c = await getData();
  
  return (
    <Container domain={domain} logo={c.data.logo} countries={c.data.countries} />
  )
}

export default Partner