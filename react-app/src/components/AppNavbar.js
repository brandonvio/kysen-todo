import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * Navbar()
 */
export function AppNavbar() {
  const auth = useSelector((state) => state.authReducer.auth);
  console.log("AppNavbar:auth?.name", auth?.name);
  console.log("AppNavbar:auth", auth);
  const name = "Brandon Vicedomini";
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        my//todos<span style={{ color: "lightgreen" }}>...a portfolio application</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to={{ pathname: "/" }}>
            home
          </Link>
          <Nav.Link href="/auth/signup">signup</Nav.Link>
          <Nav.Link href="/auth/login">login</Nav.Link>
          <Nav.Link href="/auth/confirm">confirm</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">{auth?.name || "guest"}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
