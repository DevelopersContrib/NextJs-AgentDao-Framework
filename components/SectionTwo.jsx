'use client'

import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../app/custom.css';

const SectionTwo = ({ domain }) => {
  return (
    <section className='section-two'>
      <section className="info-section text-center" style={{ color: 'black' }}>
        <div className="border-top border-bottom py-3" style={{ borderColor: '#d2d5db' }}>
          <h3 className='mb-0'>What is {domain}?</h3>
        </div>
        <div className="py-5">
          <Row className='justify-content-center py-5 px-4'>
            <Col md='6'>
              <h2 className='mb-0 py-5'>
                This platform is a part of the AgentDao framework, a cutting-edge network of autonomous smart agents built on URL structures. These agents are designed to efficiently create, manage, and monetize a comprehensive network of highly specialized, personalized services, delivering innovative solutions tailored to various business needs.
              </h2>
            </Col>
          </Row>
        </div>
        <div className="border-top py-3" style={{ borderColor: '#d2d5db' }}>
          <h3 className='mb-0'>How does it work?</h3>
        </div>
      </section>
      
      <Container fluid className='p-0'>        
        <Row className='g-0'>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <div className="column-border py-5" style={{ borderColor: '#d2d5db' }}>
              <Card className='custom-card text-center1 p-4 mb-4'>
                <Card.Body className='py-5'>
                  <div className="icon-bg partner-icon mb-3">
                    <i className="bi bi-textarea" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <Card.Title>Partner</Card.Title>
                  <Card.Text>
                    Become a partner and grow with us. Collaborate to create innovative solutions and drive mutual success.
                  </Card.Text>
                  <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} passHref>
                    <Button variant="dark" size="sm">Learn more</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <div className="column-border py-5" style={{ borderColor: '#d2d5db' }}>
              <Card className='custom-card text-center1 p-4 mb-4'>
                <Card.Body className='py-5'>
                  <div className="icon-bg join-icon mb-3">
                    <i className="bi bi-bounding-box" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <Card.Title>Join the Team</Card.Title>
                  <Card.Text>
                    Be a part of a dynamic and innovative team. Work with us to shape the future of personalized services.
                  </Card.Text>
                  <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} passHref>
                    <Button variant="dark" size="sm">Join now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <div className="column-border-last py-5" style={{ borderColor: '#d2d5db' }}>
              <Card className='custom-card text-center1 p-4 mb-4'>
                <Card.Body className='py-5'>
                  <div className="icon-bg inquire-icon mb-3">
                    <i className="bi bi-question-square" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <Card.Title>Inquire</Card.Title>
                  <Card.Text>
                    Have questions? We are here to provide answers and guide you every step of the way.
                  </Card.Text>
                  <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} passHref>
                    <Button variant="dark" size="sm">Inquire now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SectionTwo;
