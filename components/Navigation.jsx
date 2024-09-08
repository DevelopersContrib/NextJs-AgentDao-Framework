"use client"
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const navigation = ({domain}) => {
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Link href="/" className='nav-link'>
              Home
            </Link>
            <Nav.Link href={'https://www.contrib.com/to/'+domain} target="_blank">
              Contribute
            </Nav.Link>
            <Link href="/partner" className='nav-link' r>
            Partner
            </Link>
            <Link href={"https://advertise.ipartner.com/?domain="+domain} className='nav-link' target='_blank'>
            Advertise
            </Link>
            <Link href="/about" className='nav-link'>
            About
            </Link>
            
            <Nav.Link href={"https://domaindirectory.com/servicepage/?domain="+domain} target='_blank'>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default navigation