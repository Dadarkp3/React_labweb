import React from 'react';

// Style
import './style.css';

const Button = ({ text, callback }) => (
  <button className='secondary-btn' type='button' onClick={callback}>
    {text}
  </button>
);

export default Button;
