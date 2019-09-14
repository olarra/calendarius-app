import config from "../../config/env";
import axios from "axios";

const { API_ENDPOINT_USER } = config;

export default class AuthService {
  static login = user =>
    axios
      .post(`${API_ENDPOINT_USER}`, { user })
      .then(res => {
        console.log("res", res);
      })
      .catch(error => {
        console.log("error", error);
      });
}
