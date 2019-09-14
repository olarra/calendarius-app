import React, { Component } from "react";
import { Navbar, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>
      <Button variant="info">
        <Link to="/home" style={{ color: "white" }}>
          Calendarius App
        </Link>
      </Button>
    </Navbar.Brand>
  </Navbar>
);
