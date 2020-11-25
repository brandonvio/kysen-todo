import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * Navbar()
 */
export function AppNavbar() {
  const auth = useSelector((state) => state.authReducer.auth);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        my//todos<span style={{ color: "lightgreen" }}>...git-er-done</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!auth.authenticated && (
            <>
              <Link className="nav-link" to={{ pathname: "/auth/signup" }}>
                signup
              </Link>
              <Link className="nav-link" to={{ pathname: "/auth/login" }}>
                login
              </Link>
              <Link className="nav-link" to={{ pathname: "/auth/confirm" }}>
                confirm
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {auth?.name && (
            <>
              Signed in as: <a href="#login">{auth?.name || "guest"}</a>
            </>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
