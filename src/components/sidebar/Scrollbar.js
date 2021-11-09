import React from 'react';
import {Scrollbars} from "react-custom-scrollbars"

export const Scrollbar = () => {
  return (
    
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  );
};