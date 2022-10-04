import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function SignedOut() {
  return (
    <div>
      <div>
      <Navbar expand="lg" className="SignedOutNavbar">
      <Container fluid className="navbar-container">
        <Navbar.Brand as={NavLink} to="/copyright">
          Student Management System
        </Navbar.Brand>
        <Button as={NavLink} to="/login">
          Login{" "}
        </Button>
        </Container>
        </Navbar>
      </div>
    </div>
  );
}
