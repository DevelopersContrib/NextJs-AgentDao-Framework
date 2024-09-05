import Container from '../../components/Buy/Container';
import { getDomain, getData } from '../../lib/data';

const Buy = async() => {
  const domain = getDomain();
  const c = await getData();

  return (
    <Container domain={domain} logo={c.data.logo} countries={c.data.countries} />
  )
}

export default Buy