import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Boat rental and reservation </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/renting">Renting</Nav.Link>
            <Nav.Link href="/Rental">Rental</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          
          <Nav className="d-flex align-items-center ms-auto">

            {/* Replace Nav.Link with Link from react-router-dom */}
            <Nav.Link as={Link} to="/login" className="mr-3">
             Log In
            </Nav.Link>
            <Nav.Link href="/register" className="mr-3">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
