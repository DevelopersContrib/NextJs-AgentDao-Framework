'use client'

import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUsers, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const SectionTwo = ({ domain }) => {
  return (
    <section className='section-two'>
      <Container fluid>
        <Row className='g-0'>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <div className="column-border">
              <Card className='text-center p-4 mb-4' style={{ backgroundColor: '#000', color: '#fff' }}>
                <Card.Body className='py-5'>
                  <FontAwesomeIcon icon={faHandshake} size="3x" className='mb-3' />
                  <Card.Title>Partner</Card.Title>
                  <Card.Text>
                    Become a partner and grow with us.
                  </Card.Text>
                  <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} passHref>
                    <Button variant="primary" size="sm">Learn more</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <div className="column-border">
              <Card className='text-center p-4 mb-4' style={{ backgroundColor: '#000', color: '#fff' }}>
                <Card.Body className='py-5'>
                  <FontAwesomeIcon icon={faUsers} size="3x" className='mb-3' />
                  <Card.Title>Join the Team</Card.Title>
                  <Card.Text>
                    Be a part of our dynamic team.
                  </Card.Text>
                  <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} passHref>
                    <Button variant="primary" size="sm">Join now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <div className="column-border-last">
              <Card className='text-center p-4 mb-4' style={{ backgroundColor: '#000', color: '#fff' }}>
                <Card.Body className='py-5'>
                  <FontAwesomeIcon icon={faQuestionCircle} size="3x" className='mb-3' />
                  <Card.Title>Inquire</Card.Title>
                  <Card.Text>
                    Have questions? We are here to help.
                  </Card.Text>
                  <Link href={`https://domaindirectory.com/servicepage/?domain=${domain}`} passHref>
                    <Button variant="primary" size="sm">Inquire now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .section-two {
          background-color: #000;
          color: #fff;
        }        
        .column-border {
          border-right: 1px solid #353532;
          border-top: 1px solid #353532;
          border-bottom: 1px solid #353532;
        }
        .column-border-last {
          border-top: 1px solid #353532;
          border-bottom: 1px solid #353532;
        }
      `}</style>
    </section>
  );
}

export default SectionTwo;
