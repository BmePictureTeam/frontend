import React, {
  useEffect,
  useState,
  Component,
  ChangeEvent,
  FormEvent,
} from "react";
import logo from "./logo.svg";
import "./App.css";

import ReactDOM from "react-dom";
import { Backend } from "./service/backend";
import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import { Root } from "./Root";

function App() {
 


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Root/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
