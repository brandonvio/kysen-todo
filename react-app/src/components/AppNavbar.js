import React from "react";
import { Navbar } from "react-bootstrap";

/**
 * Navbar()
 */
export function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        my|todos<a href="">...a portfolio application</a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}
