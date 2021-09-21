import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Banner.css';

function Banner() {
  return (
    <div className='banner-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <h1>Real Time Satelitte Tracker</h1>
      <p> Lorem ipsum dolor sit amet</p>
      <div className='banner-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        
      </div>
    </div>
  );
}

export default Banner;