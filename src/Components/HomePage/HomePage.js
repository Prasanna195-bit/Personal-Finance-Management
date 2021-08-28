import React from 'react';
import './CSS/Home.css';
import { Link } from 'react-router-dom';
import finance from './Images/stock_futuristic.mp4'
// TODO - Major Refactoring needed


const HomePage = () => {

  return (
    <div>
      <div class="homeContainer">
        <video autoPlay muted loop id="myVideo">
          <source src={finance} type="video/mp4" />
        </video>
        <div class="heading">
          <b>PERSONAL FINANCE MANAGEMENT</b>
        </div>

        <Link to='/login'>
          <button class="glow-on-hover" type="button" >Get Started!</button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage;