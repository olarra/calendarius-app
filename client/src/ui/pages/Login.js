import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Alert,
  Button
} from "react-bootstrap";
import {Emoji, OCFButton} from "../common";

export class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange(e) {
    console.log("change", e.target.name)
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    console.log('An essay was submitted: ', this.state);
    event.preventDefault();
  }

  render() {
    return (<Container fluid={true}>
      <Row>
        <Col xs={5} style={styles.presentation}>
          <Row className="justify-content-center" style={styles.logoContainer}>
            <Image src="assets/ock-logo.png" fluid="fluid" style={{
                height: 120
              }}/>
            <p style={styles.calendariusTitle}>Calendarius !</p>
            <p style={{
                ...styles.byWord,
                ...styles.textApp
              }}>By</p>
            <p style={styles.textApp}>One Click Flare</p>

            <p style={{
                ...styles.textApp,
                fontSize: 20,
                color: "#ffdd59",
                position: "absolute",
                bottom: 10
              }}>
              Author : Jesus GARNICA OLARRA
            </p>
          </Row>
        </Col>
        <Col style={styles.formContainer}>
          <h2 style={styles.loginTitle}>Login</h2>
          <Alert variant="primary" style={{
              width: "75%",
              marginTop: 20
            }}>
            <Alert.Heading>
              Hey, nice to see you, please find here below your identifiers.
              <Emoji symbol="🤩"/>
            </Alert.Heading>
            <p>
              username :<span className="alert-link">meddy.menzikoff</span>
              <br/>
              password :<span className="alert-link">password</span>
            </p>
          </Alert>
          <Form style={{
              width: "50%",
              marginTop: 90
            }}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label style={{
                  color: "#786fa6"
                }}>
                USERNAME
              </Form.Label>
              <Form.Control name="username" onChange={(e) => this.handleChange(e)} type="text" placeholder="Username"/>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label style={{
                  color: "#786fa6"
                }}>
                PASSWORD
              </Form.Label>
              <Form.Control name="password" onChange={(e) => this.handleChange(e)} type="password" placeholder="Password"/>
            </Form.Group>
          </Form>
          <div style={{
              width: "50%"
            }}>
            <OCFButton style={(!this.state.username || !this.state.password) ? styles.disabled : styles.buttonLogin} type="submit" disabled={!this.state.username && !this.state.password } onClick={(e) => this.handleSubmit(e)}>Login</OCFButton>
          </div>
        </Col>
      </Row>
    </Container>);
  }
}

const styles = {
  presentation: {
    height: "100vh",
    background: "linear-gradient(to bottom, #2b5876, #4e4376)"
  },
  loginTitle: {
    color: "#786fa6",
    width: "50%",
    fontWeight: 100,
    fontSize: 40,
    marginTop: 50,
    textAlign: "center"
  },
  calendariusTitle: {
    color: "#ffff",
    fontSize: 50,
    fontWeight: 400,
    marginTop: "30px",
    marginBottom: 0
  },
  byWord: {
    fontSize: 24,
    color: "#ffdd59"
  },
  disabled:{
     opacity: "0.65",
     background: "#4340ae",
     marginTop: "15px",
     border: "none",
     color: "white",
     padding: "9px 80px",
     borderRadius: "3px"
  },
  buttonLogin: {
    background: "#4340ae",
    marginTop: "15px",
    border: "none",
    color: "white",
    padding: "9px 80px",
    borderRadius: "3px"
  },
  formContainer: {
    height: "100vh",
    background: "#ffff",
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 120
  },
  textApp: {
    color: "#ffff",
    fontSize: 30,
    marginBottom: 0,
    fontWeight: 100
  }
};
