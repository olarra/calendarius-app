import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // react-bootsrap dependency
import "./index.css";
import { CalendariousRouter } from "./navigation";

import { configStore } from "./redux";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={configStore()}>
    <CalendariousRouter />
  </Provider>,
  document.getElementById("root")
);
