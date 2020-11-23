import React from 'react';

// Style
import './style.css';

const Button = ({ title, callback }) => (
  <button className='secondary-btn' type='button' onClick={callback}>
    {title}
  </button>
);

export default Button;
