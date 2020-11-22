import React from "react";
import { Navbar, Nav } from "react-bootstrap";

/**
 * Navbar()
 */
export function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        my//todos<span style={{ color: "lightgreen" }}>...a portfolio application</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">home</Nav.Link>
          <Nav.Link href="/auth/signup">signup</Nav.Link>
          <Nav.Link href="/auth/login">login</Nav.Link>
          <Nav.Link href="/auth/confirm">confirm</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
