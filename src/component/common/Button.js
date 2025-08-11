import React from 'react';

const Button = ({ children, onClick, color = 'is-primary', ...props }) => (
  <button className={`button ${color}`} onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button;
