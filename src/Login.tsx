import React, { useState, Component, ChangeEvent, FormEvent } from "react";
import { Backend } from "./service/backend";
import { useMemo } from "react";

import { useContext } from "react";
import { useHistory, useLocation, __RouterContext } from "react-router";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { allowedNodeEnvironmentFlags } from "process";

export function Login() {
  const [email, updateEmail] = useState("");

  const onEmailChange = (event: any) => {
    updateEmail(event.target.value);
  };

  const [password, updatePassword] = useState("");

  const history = useHistory();

  if (Backend.isLoggedIn()) {
    history.push("/dashboard");
  }

  const onPasswordChange = (event: any) => {
    console.log(event.target.value);
    updatePassword(event.target.value);
  };

  const onSubmitPressed = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (email.length == 0 || password.length == 0) {
      return;
    }

    try {
      await new Backend().login(email, password);
      history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Login">
      <form id="usrform" onSubmit={onSubmitPressed}>
        <header className="Szoveg">Felhasználonév:</header>
        <input
          onChange={onEmailChange}
          value={email}
          className="SzovegBevitel"
          type="text"
          name="usrname"
        />
        <header className="Szoveg">Jelszó:</header>
        <input
          onChange={onPasswordChange}
          value={password}
          className="SzovegBevitel"
          type="password"
          name="password"
        />
        <br />

        {/* <Link to="/dashboard"><button type="submit" className="BejelentkezesGomb">
            Bejelentkezés
          </button></Link> */}

        <button type="submit" className="BejelentkezesGomb">
          Bejelentkezés
        </button>

        <br />
        <p>
          <Link to="/register" id="regLink">
            Regisztráció
          </Link>
        </p>
      </form>
    </div>
  );
}
