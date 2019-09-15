import React, { Component } from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Emoji} from "./Emoji";

export const Header = ({logout, user}) => (

  <Navbar expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <Link to="/agenda" style={{ color: "#eccc68" }}>
        <strong>Calendarius App <Emoji symbol="📆"/></strong>
     </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={()=>logout()}>Déconnexion</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          <span style={{color:"#D6A2E8"}}>Bienvenue : {user.username}</span>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

);
