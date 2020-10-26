import React, { useState, FormEvent } from "react";
import { Backend } from "./service/backend";
import { __RouterContext } from "react-router";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
export function Register() {
  const [email, updateEmail] = useState("");

  const [password, updatePassword] = useState("");
  const history = useHistory();
  const onEmailChange = (event: any) => {
    updateEmail(event.target.value);
  };

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
      await new Backend().registration(email, password);

      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Register">
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

        <button type="submit" className="BejelentkezesGomb">
          Regisztálok
        </button>
      </form>
    </div>
  );
}
