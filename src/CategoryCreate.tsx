import React, { useState, Component, ChangeEvent, FormEvent } from "react";
import { Backend } from "./service/backend";
import { useMemo } from "react";

import { useContext } from "react";
import { useHistory, useLocation, __RouterContext } from "react-router";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { allowedNodeEnvironmentFlags } from "process";

export function CategoryCreate() {


  const history = useHistory();


  const visszaClick = async () => {
    if (Backend.isLoggedIn()) {
      history.push("/dashboard");
    }else{
      history.push("/login");
    }
    window.location.reload(false);
    return;
  }




  const [nev, updateNev] = useState("");


  const onNevChange = (event: any) => {
    console.log(event.target.value);
    updateNev(event.target.value);
  };


  const onSubmitPressed = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (nev.length == 0) {
      return;
    }

    try {
      await new Backend().createCategory(nev);
      history.push("/dashboard");
      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="CategoryCreate">
      <form id="usrform" onSubmit={onSubmitPressed}>
        <header id="kategoriaSzoveg">Az új kategória neve:</header>
        <input
          onChange={onNevChange}
          value={nev}
          id="katBevitel"
          type="text"
          name="usrname"
        />
        <br />

        <button type="submit" id="KategiaLetrehozasGomb">
          Kategória Létrehozása
        </button>

      </form>

      <button type="submit" id="KatVisszaGomb" onClick={() => visszaClick()}>
          Vissza
        </button>

    </div>
  );
}
