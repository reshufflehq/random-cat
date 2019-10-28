import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PreviewFrame from '../PreviewFrame';

import { addNewUrl, deleteLink, getLinks } from '../../../backend/backend';
import './Admin.css';

export default function Admin() {
  const [inputValue, setInputValue] = useState('');
  const [linksList, setLinksList] = useState([]);
  const [frameKey, setFrameKey] = useState(1);

  useEffect(() => {
    async function fetchFromDb() {
      const links = await getLinks();
      setLinksList(links);
    }
    try {
      fetchFromDb();
    } catch {
      console.error('An error on fetch urls list from db');
    }
  }, []);

  const handleAddLink = async () => {
    try {
      const text = inputValue;

      // prevent empty string to add in list
      if (!text) return;

      const list = await addNewUrl(text);

      // update page with the new url
      setLinksList(list.reverse());
      setInputValue('');
      setFrameKey(frameKey + 1);
    } catch (error) {
      console.error('Error on adding link to db');
    }
  };

  const handleChange = ({ which, target, keyCode }) => {
    if (which === 13 || keyCode === 13) {
      handleAddLink();
      return;
    }
    setInputValue(target.value);
  };
  const handleDeleteList = async url => {
    const list = await deleteLink(url);

    if (list) {
      setLinksList(list.reverse());
    }
  };

  return (
    <Container className='mt-4 mb-5'>
      <Link to='/live' className='link'>
        Live
      </Link>

      <Row>
        <Col className='col-md-7 col-sm-10'>
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

          {linksList.map(url => (
            <Row className='ml-0 url-row' key={url} variant='info'>
              <Button
                variant='light'
                size='sm'
                onClick={() => handleDeleteList(url)}
              >
                X
              </Button>
              <Col className='col-10 trim-text'>
                <span>{url}</span>
              </Col>
            </Row>
          ))}
        </Col>
        <Col>
          <PreviewFrame />
        </Col>
      </Row>
    </Container>
  );
}
