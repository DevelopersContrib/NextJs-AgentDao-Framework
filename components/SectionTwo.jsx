"use client"
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUsers, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const SectionTwo = ({ domain }) => {
  return (
    <section className='py-5'>
      <Container className='py-5'>
        <Row>
          <Col className='text-center'>
            <h2 className='text-capitalize fw-bold'>
              {domain}
            </h2>
          </Col>
        </Row>
        <Row className='justify-content-center text-center mb-4'>
          <Col md={7}>
            <p>
              is part of the AgentDao framework, a network of autonomous smart agents built on URLs that build, manage, and monetize a network of specialized and personalized agents.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className='text-center p-4 shadow-sm mb-4'>
              <Card.Body>
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
          </Col>
          <Col md={4}>
            <Card className='text-center p-4 shadow-sm mb-4'>
              <Card.Body>
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
          </Col>
          <Col md={4}>
            <Card className='text-center p-4 shadow-sm mb-4'>
              <Card.Body>
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
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SectionTwo;
