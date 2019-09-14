import React from "react";
import { Container, Row, Col, Image, Form, Alert, Button } from "react-bootstrap";

export const NoMatch = () => <Container fluid={true}>
<Row>
  <Col style={styles.presentation}>
    <p style={styles.error}>404</p>
    <p style={styles.subtitle}>Ups! Page not Found.</p>
  </Col>
</Row>
</Container>;

const styles = {
  presentation: {
    height: "100vh",
    alignItems:"center",
    justifyContent:"center",
    display:"flex",
    flexDirection:"column",
    background: "linear-gradient(to bottom, #ec6f66, #f3a183)"
  },
  error :{
    color:"#ffff",
    fontSize:120
  },
  subtitle :{
    color:"#ffff",
    fontSize:80,
    fontWeight:100
  }
}
