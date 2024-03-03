import React from "react";
import { Link } from "react-router-dom";
import images from '../../constants/images';
import './Heading.css'


function Header() {
  return (
    <React.Fragment>
      <div className="heading" >
        <img src={images.furever} alt="logo" />
      </div>
    </React.Fragment >
  );
}

export default Header;