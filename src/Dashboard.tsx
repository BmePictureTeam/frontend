import React, { useState, Component, ChangeEvent, FormEvent } from "react";
import { Backend } from "./service/backend";
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import ReactDOM from "react-dom";
import { Register } from "./Register";

function kijelentkezesClick() {
  Backend.setToken(null);
  localStorage.removeItem("token")
  window.location.reload(false);
}



export function Dashboard() {

  const history = useHistory();
  const localion = useLocation();
  if (!Backend.isLoggedIn()) {
    history.push("/login");
  }



  const ujKategoriaClick = async () => {
    if (Backend.isLoggedIn()) {
      history.push("/categorycreate");
    }else{
      history.push("/login");
    }
    window.location.reload(false);

    return;
  }

  
  

  return (
    <div className="Dashboard">
      <div className="Fejlec">
        <div id="bejelentkezveText">Bejelentkezve: Ócsai Dávid</div>

      <button id="kijelentkezesText" onClick={kijelentkezesClick}>
        Kijelentkezés
      </button>
            
      
      </div>
      <form className="KeresesForm">
        <input className="KeresesBevitel" type="text" name="usrname" />
        <button type="submit" id="KeresesGomb">
          Keresés
        </button>
      </form>
      <button type="submit" id="UjKategoriaGomb" onClick={() => ujKategoriaClick()}>
        Új Kategória
      </button>
      <br />
      <div id="KategoriaText">Kategória</div>

      <table id="tabla">
        <tr>
          <th>Név</th>
          <th>Képek darabszáma</th>
          <th></th>
        </tr>
        <tr className="paratlan">
          <td>Tájképek</td>
          <td>12</td>
          <td></td>
        </tr>
        <tr className="paros">
          <td>Portré</td>
          <td>432</td>
          <td></td>
        </tr>
        <tr className="paratlan">
          <td>Sport</td>
          <td>23</td>
          <td></td>
        </tr>
        <tr className="paros">
          <td>Naplemente</td>
          <td>433</td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}
