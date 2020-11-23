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


  const onSearchChange = (event: any) => {
    updatekeresettSzoveg(event.target.value);
  };


  const keresesClick = async () => {
 
    if(keresettSzoveg===""){
      updateKategoriak();
      
    }else{
      
      var kat = [];
      for (const k of kategoriak) {
        if(k.name.toLowerCase().includes(keresettSzoveg.toLowerCase())){
          kat.push(k);
        }
      }
      setKategoriak(kat);
      return;
    }
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


  const deleteKategoria = async (id:string) => {
    try {
      const response = await new Backend().deleteCategory(id);
       await updateKategoriak ();
      
    } catch (error) {
      console.error(error);
    }
  };

  const atnevezKategoria = async (id:string,name:string) => {
    try {
      const response = await new Backend().renameCategory(id,name);
       await updateKategoriak ();
      
    } catch (error) {
      console.error(error);
    }
  };


  const [name, setName] = useState('')

  const [keresettSzoveg, updatekeresettSzoveg] = useState('');

  const renObjData = kategoriak.map(
     (kategoria) => {
    return ( 
      <tr className="paros">
        <td>{kategoria.name}</td>
        <td >{kategoria.image_count}</td>
        <td className="gombcella">
          <input className="renameInput" type="text" onChange={event => setName(event.target.value) }/>
          <button className="atvevezesGombok" onClick={() => atnevezKategoria(kategoria.id,name)}>Átnevez</button>
          <button className="torlesGombok" onClick={() => deleteKategoria(kategoria.id)}>Törlés</button>
        </td>
        </tr>
        
     );
 }
 
 
 );

  return (
    <div className="Dashboard">
      <div className="Fejlec">
        <div id="bejelentkezveText">Bejelentkezve: {email}</div>

      <button id="kijelentkezesText" onClick={kijelentkezesClick}>
        Kijelentkezés
      </button>
            
      
      </div>
  
      <input
          onChange={onSearchChange}
          value={keresettSzoveg}
          className="KeresesBevitel"
          type="text"
          name="usrname"
        />

        <button id="KeresesGomb" onClick={() => keresesClick()}>
          Keresés
        </button>
      
      <button type="submit" id="UjKategoriaGomb" onClick={() => ujKategoriaClick()}>
        Új Kategória
      </button>
      <br />
      <div id="KategoriaText">Kategória</div>


      <table id="tabla">
      <thead>
        <tr>
          <th>Név</th>
          <th>Képek darabszáma</th>
          <th className="gombcella">Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {renObjData}
      </tbody>
      </table>
    </div>
  );
}
