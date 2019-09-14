import config from "../../config/env";
import axios from "axios";

const {API_ENDPOINT} = config;

export default class AuthService {
  static login = user => axios.post(`/login`, user).then(res => {
    console.log("res", res);
    return ({user: res.data.user});
  }).catch(error => {
    console.log("error", error.response);
    return ({message: error.response.data.message});
  });

  static isAuthenticated = user => axios.get(`/authenticated`).then(res => {
    console.log("res", res);
  }).catch(error => {
    console.log("error", error);
  });
}
