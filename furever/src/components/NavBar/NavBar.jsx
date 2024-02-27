import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import  images from '../../constants/images';
import data from '../../constants/data';

const NavBar = () => {
  return (

         <Navbar collapseOnSelect expand="lg" bg="ligth" variant="ligth" class="navbar navbar-fixed-top">
              <Container>
                  <Navbar.Brand href="#home"> <img src={images.fureverdogcat} alt="logo" /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                      <Nav>
                          {data.NavBar.map((item, index) => ( 
                              <Nav.Link href={item.link}>{item.text}</Nav.Link>
                          ))}
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>

   
  )
}

export default NavBar