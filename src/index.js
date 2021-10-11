import React, { Component } from "react";
import reactDOM from "react-dom";
import "./index.css";
import KeyPadContainer from "./components/KeyPadContainer";
reactDOM.render(
    <React.StrictMode>
        <KeyPadContainer />
    </React.StrictMode>,
    document.getElementById("root")
)