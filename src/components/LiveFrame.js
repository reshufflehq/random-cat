import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { getLinks } from '../../backend/backend';

const generateRandomNumber = list => {
  return Math.floor(Math.random() * list.length);
};

export default function Admin() {
  const [linksList, setLinksList] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function fetchFromDb() {
      let links = await getLinks();
      setLinksList([...links]);
      const random = generateRandomNumber(links);
      setUrl(links[random].url);
    }
    try {
      fetchFromDb();
    } catch {
      console.error('An error on fetch');
    }
  }, []);

  const handleClick = event => {
    try {
      const random = generateRandomNumber(linksList);
      setUrl(linksList[random].url);
    } catch (error) {
      console.error('error HandleClick');
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center p-3'>
        <Col>
          <Image
            className='img-fluid'
            src={`${url}`}
            rounded
            onClick={handleClick}
          />
        </Col>
      </Row>
    </Container>
  );
}