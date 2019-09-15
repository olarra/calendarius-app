import config from "../../config/env";
import axios from "axios";

const { API_ENDPOINT } = config;

export default class AuthService {
  static login = user =>
    axios
      .post(`/login`, user)
      .then(res => {
        console.log("res", res);
        return { user: res.data.user };
      })
      .catch(error => {
        console.log("error", error.response);
        return { message: error.response.data.message };
      });

  static logout = () =>
    axios
      .get(`/logout`)
      .then(res => {
        console.log("res", res);
        return res;
      })
      .catch(error => {
        console.log("error", error);
      });

  static protected = user =>
    axios
      .get(`/protected`)
      .then(res => {
        console.log("res", res);
      })
      .catch(error => {
        console.log("error", error);
      });

  static isAuthenticated = () =>
    axios
      .get(`/profile`)
      .then(res => res)
      .catch(error => error.response);
}
