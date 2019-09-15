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
import AuthService from "../../redux/auth/service";
import {Emoji, OCFButton} from "../common";

export class Login extends React.Component {
  state = {
    username: "",
    password: "",
    isDismissed: false,
    authenticated: false,
    fetching: "true"
  };

  componentDidMount() {
    AuthService.isAuthenticated().then(res => {
      if (res.status === 200) {
        this.setState({authenticated: true, fetching: false});
        this.props.history.push('/agenda');
      } else {
        this.setState({authenticated: false, fetching: false});
      }
    });
  }

  showErrorAuth() {
    const {auth} = this.props;
    return (<Alert variant="danger" onClose={() => this.setState({isDismissed: true})} dismissible="dismissible">
      <Alert.Heading>Oh snap! Vous avez une erreur!!</Alert.Heading>
      <p>{auth.error.message}</p>
    </Alert>)
  }

  handleChange(e) {
    console.log("change", e.target.name);
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  async handleSubmit(event) {
    console.log("An essay was submitted: ", this.props);
    const {requestLogin} = this.props;
    await requestLogin(this.state);
    this.setState({username: "", password: ""});
    this.setState({isDismissed: false});
    (this.props.auth.user.id) && this.props.history.push("/agenda")
  }

  render() {
    const {auth} = this.props;
    if (this.state.fetching && !this.state.authenticated) {
      return <div></div>
    }

    if (!this.state.fetching && this.state.authenticated) {
      return <div></div>
    }

    if (!this.state.fetching && !this.state.authenticated) {

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
                }}>
                By
              </p>
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
            <h2 style={styles.loginTitle}>Page de connexion</h2>
            <Alert variant="primary" style={{
                width: "75%",
                marginTop: 20
              }}>
              <Alert.Heading>
                Hé, ravi de vous voir, veuillez trouver ci-dessous vos identifiants.
                <Emoji symbol="🤩"/>
              </Alert.Heading>
              <p>
                username : {" "}
                <span className="alert-link">meddy.menzikoff</span>
                <br/>
                password : {" "}
                <span className="alert-link">password</span>
              </p>
            </Alert>
            <div style={{
                width: "75%",
                marginTop: 15,
                height: 120
              }}>
              {(auth.error && !this.state.isDismissed) && this.showErrorAuth()}
            </div>
            <Form style={{
                width: "50%",
                marginTop: 20
              }}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label style={{
                    color: "#786fa6"
                  }}>
                  USERNAME
                </Form.Label>
                <Form.Control name="username" value={this.state.username} onChange={e => this.handleChange(e)} type="text" placeholder="Username"/>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label style={{
                    color: "#786fa6"
                  }}>
                  PASSWORD
                </Form.Label>
                <Form.Control name="password" value={this.state.password} onChange={e => this.handleChange(e)} type="password" placeholder="Password"/>
              </Form.Group>
            </Form>
            <div style={{
                width: "50%"
              }}>
              <OCFButton style={!this.state.username || !this.state.password
                  ? styles.disabled
                  : styles.buttonLogin
} type="submit" disabled={!this.state.username && !this.state.password} onClick={e => this.handleSubmit(e)}>
                Login
              </OCFButton>
            </div>
          </Col>
        </Row>
      </Container>)
    }
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
  disabled: {
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
