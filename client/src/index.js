import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ServiceProvider } from "./Reducers/ServiceReducer";
import { CustomerProvider } from "./Reducers/CustomerReducer";

ReactDOM.render(
  <CustomerProvider>
    <ServiceProvider>
      <App />
    </ServiceProvider>
  </CustomerProvider>,
  document.getElementById("root")
);
