import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { addNewUrl, deleteLinkById, getLinks } from '../../../backend/backend';
import './Admin.css';

export default function Admin() {
  const [inputValue, setInputValue] = useState('');
  const [linksList, setLinksList] = useState([]);

  useEffect(() => {
    async function fetchFromDb() {
      const links = await getLinks();
      setLinksList([...links]);
    }
    try {
      fetchFromDb();
    } catch {
      console.error('An error on fetch');
    }
  }, []);

  const handleAddLink = async () => {
    try {
      let text = inputValue;

      // prevent empty string to add in list
      if (!text) return;

      // each url will have it's own id which will be used to delete this url in the future
      const list = await addNewUrl({
        id: generateRandomId(),
        url: text,
      });

      // update page with the new url
      setLinksList(list.reverse());
      setInputValue('');
    } catch (error) {}
  };

  const generateRandomId = () => {
    return new Date().getTime();
  };

  const handleChange = event => {
    if (event.key === 'Enter') {
      handleAddLink();
      return;
    }
    setInputValue(event.target.value);
  };
  const handleDeleteList = async id => {
    const list = await deleteLinkById(id);

    if (list) {
      setLinksList(list.reverse());
    }
  };

  return (
    <Container className='mt-4 mb-5'>
      <Link to='/live' className='link'>
        Live
      </Link>

      <h1 className='pt-4 pb-4'>{`Cat's List (${linksList.length})`}</h1>
      <Row className='mr-0 ml-0 pb-4'>
        <Col className='pl-0 pr-0'>
          <Form.Control
            as='input'
            type='text'
            placeholder='Add cats image url'
            className='input-control'
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleChange}
          />
        </Col>
        <Col className='col-1 pl-1 pr-0'>
          <Button onClick={handleAddLink} className='url-add'>
            +
          </Button>
        </Col>
      </Row>

      {linksList.map(({ url, id }) => (
        <Row className='ml-0 url-row' key={url} variant='info'>
          <Button
            variant='light'
            size='sm'
            className=''
            onClick={() => handleDeleteList(id)}
          >
            X
          </Button>
          <Col className='col-10 trimText '>
            <span className=''>{url}</span>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
