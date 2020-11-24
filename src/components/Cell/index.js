import React from 'react';
import './style.css';

//Componentes
import { Col } from 'react-bootstrap';

//props.value, props.click, props.position

const Cell = ({ value, callback, position }) => {
  let classes = 'Cell ';
  if (value === 0) {
    classes += 'EmptyCell';
  } else {
    classes += 'FilledCell';
  }
  return (
    <Col className='noPadding'>
      <button className={classes} onClick={callback}>
        {value}
      </button>
    </Col>
  );
};

export default Cell;
