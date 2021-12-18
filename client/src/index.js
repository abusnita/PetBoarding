import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PetBoardingProvider } from "./PetBoardingContext";

ReactDOM.render(
  <PetBoardingProvider>
    <App />
  </PetBoardingProvider>,
  document.getElementById("root")
);
