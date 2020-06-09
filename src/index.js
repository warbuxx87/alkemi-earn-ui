import React from "react";
import ReactDOM from "react-dom";
import "react-perfect-scrollbar/dist/css/styles.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
