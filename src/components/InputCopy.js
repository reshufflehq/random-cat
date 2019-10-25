/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import copy from 'clipboard-copy';

export default function InputCopy() {
  const [action, setAction] = useState('COPY');
  const url = window.location.href + 'live';

  const handleCopy = () => {
    copy(url).then(setAction('COPIED'));
  };

  return (
    <InputGroup className='mb-3 ml-0 mr-0'>
      <FormControl
        readOnly
        placeholder={url}
        aria-label={url}
        aria-describedby='basic-addon2'
      />
      <InputGroup.Append>
        <OverlayTrigger
          key='bottom'
          placement='bottom'
          trigger='click'
          overlay={
            <Tooltip id={`tooltip-bottom`}>Copied to clipboard! </Tooltip>
          }
        >
          <Button variant='outline-secondary' className='' onClick={handleCopy}>
            {action}
          </Button>
        </OverlayTrigger>
      </InputGroup.Append>
    </InputGroup>
  );
}
