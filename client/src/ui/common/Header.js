import React, { Component } from "react";
import { Navbar, Nav, Badge, Brand } from "react-bootstrap";
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
      </Nav>
      <Nav>
      <Nav.Link eventKey={2} href="#memes">
        <span style={{color:"#D6A2E8"}}>User : {user.username}</span>
      </Nav.Link>
        <Nav.Link onClick={()=>logout()}><Badge variant="primary">Déconnexion</Badge></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

);
