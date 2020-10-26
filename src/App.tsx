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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";





function App() {
  

  return (
    <div className="App">






        <Router>
   

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/register">
          <Register/>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
   
    </Router>
 


      
    </div>
  );
}

export default App;
