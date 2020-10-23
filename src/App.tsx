import React, { useEffect, useState, Component} from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';

interface Instrument {
  name: string;
  id: number;
  family: string;
  imageUrl: string;
}








interface InstrumentsResponse {
  instruments: Instrument[];
}


function buttonPressed() {
  alert("Gomb megnyomva!");
}


function App() {
  const [instrumentsResponse, updateInstruments] = useState<
    InstrumentsResponse | undefined
  >(undefined);

  useEffect(() => {
    getInstruments();
  }, []);

  const getInstruments = async () => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/instruments`, {
      method: "GET",
    });

    updateInstruments(await result.json());
  };

  // let content: any;
  // if (typeof instrumentsResponse === "undefined") {
  //   content = "";
  // } else {
  //   const instrumentDivs: any[] = [];
  //   for (const instrument of instrumentsResponse.instruments) {
  //     instrumentDivs.push(<div>{instrument.name} </div>)
  //   }
  //   content = instrumentDivs;
  // }

 
  

  return (
    <div className="App">
       <div className="Login">

       <form id="usrform">
       <header className="Szoveg">Felhasználonév:</header>
         <input className="SzovegBevitel" type="text" name="usrname"/>
         <header className="Szoveg">Jelszó:</header>
         <input className="SzovegBevitel" type="password" name="password"/>
         <br/>
         <button onClick={buttonPressed} className="BejelentkezesGomb">Bejelentkezés</button>
         </form>


      </div>
      
    </div>
  );
}


export default App;
