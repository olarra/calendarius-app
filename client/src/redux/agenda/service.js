// import config from "../../config/env";
import axios from "axios";

// const { API_ENDPOINT } = config;

export default class AgendaService {
  static updateAgenda = agenda =>
    axios
      .post(`/agenda`, agenda)
      .then(res => {
        console.log("res", res);
        return res
      })
      .catch(error => {
        console.log("error", error.response.statusText);
        return { message: error.response.statusText };
      });
}
