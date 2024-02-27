import React from "react";
import { Link } from "react-router-dom";
import  images  from '../../constants/images';
import './Heading.css'


function Header() {
  return (
    <React.Fragment>
      <h1>Furever</h1>
      <img src={images.furever} alt="logo" />
    </React.Fragment>
  );
}

export default Header;