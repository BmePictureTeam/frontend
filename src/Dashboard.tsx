import React, { useState, Component, ChangeEvent, FormEvent, useEffect } from "react";
import { Backend, Category} from "./service/backend";
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
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  window.location.reload(false);
}



export function Dashboard() {
  var email: string | null = localStorage.getItem("email");
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

  const [kategoriak, setKategoriak] = useState([] as Category[]);

  const updateKategoriak = async () => {
    try {
      const response = await new Backend().getCategories();
      setKategoriak(response.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{updateKategoriak();}, []);

  return (
    <div className="Dashboard">
      <div className="Fejlec">
        <div id="bejelentkezveText">Bejelentkezve: {email}</div>

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
          <td>{kategoriak[0]?.name}</td>
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
