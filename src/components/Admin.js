import "@reshuffle/code-transform/macro";
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { addNewUrl, deleteLinkById, getLinks } from '../../backend/backend';

export default function Admin() {
    const [inputValue, setInputValue] = useState('');
    const [linksList, setLinksList] = useState([]);

    useEffect(() => {
        async function fetchFromDb() {
          let links = await getLinks();
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
    
            // each todo will have it's own id which will be used to delete this todo in future
            const list = await addNewUrl({
                id: generateRandomId(),
                text
            });
            
                // update app with new todo list
                setLinksList(list.reverse());
                setInputValue("");
            
        }
    catch (error) {
        
    }
}
    
const generateRandomId = () => {
    return new Date().getTime();
  }

    const handleChange = event => {
        if (event.key === "Enter") {
          handleAddLink();
          return;
        }
        setInputValue(event.target.value);
    }
    const handleDeleteList = async (id) => {
        const list = await deleteLinkById(id);

            if (list) {
                setLinksList(list.reverse());
            }
}
    
    return (
        <Container>
        <h1>Cat's List</h1>
        <div className="d-flex mt-4 ">
                <Form.Control
                    as="input"
                    type="text"
                    placeholder="Add cats image url"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleChange}
          />
          <Button
            onClick={handleAddLink}
            className="ml-3"
          >
            +
          </Button>
        </div>

        <div className="py-2" />

        {linksList.map(({ text, id }) => (
          <div
            className="d-flex justify-content-between align-items-center py-2"
            key={text}
          >
            <div className="flex-grow-1 text-align-left">
              <span>{text}</span>
            </div>
            <Button
              className="ml-3 my-button"
              onClick={() => handleDeleteList(id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </Container>
    );
}