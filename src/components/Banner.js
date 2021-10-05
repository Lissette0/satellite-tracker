import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Banner.css';
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className='banner-container'>
      <h1>Satellite Earth </h1>
      <p> Real Time Satelitte Tracker</p>
      <div className='banner-btns'>
        <Link to = '/content'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
          GET STARTED
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;