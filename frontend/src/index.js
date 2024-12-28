import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import MyStore from "./redux/MyStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={MyStore}>
        <App />
    </Provider>
);

reportWebVitals();
