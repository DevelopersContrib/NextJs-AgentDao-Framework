'use client'

import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../app/custom.css';

const SectionTwo = ({ domain }) => {
  return (
    <section className='section-two'>
      <Container className='py-5 mt-5'>        
        <Row className=''>
          <Col md={4} className="justify-content-center">
            <div className="section-card">
              <Card className='custom-card text-center1 mb-4'>
                <Card.Body className='section-card-border'>
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
          <Col md={4} className="justify-content-center">
            <div className="section-card">
              <Card className='custom-card text-center1 mb-4'>
                <Card.Body className='section-card-border'>
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
          <Col md={4} className="justify-content-center">
            <div className="section-card">
              <Card className='custom-card text-center1 mb-4'>
                <Card.Body className='section-card-border'>
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
