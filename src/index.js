import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Provider } from "react-redux";
// import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  <Router>
    <App />
    {/* <Route path="/" element={<App />}></Route> */}
  </Router>
  // </Provider>
);

reportWebVitals();
