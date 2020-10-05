import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface Instrument {
  name: string;
  id: number;
  family: string;
  imageUrl: string;
}


interface InstrumentsResponse {
  instruments: Instrument[];

}

function App() {

  const [instrumentsResponse, updateInstruments] = useState<InstrumentsResponse | undefined>(undefined );

  useEffect(() => {
    getInstruments();
  }, []);

  const getInstruments = async () => {

    const result = await fetch("https://temalab.cicum.icu/instruments", {
      method: "GET",
    });

    updateInstruments(await result.json())

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
      <header className="App-header">
        {typeof instrumentsResponse === "undefined" ? "" : instrumentsResponse!.instruments.map((instrument) => (<InstrumentView instrument={instrument}  /> ))}
      </header>
    </div>
  );
}

const InstrumentView  = (props: {instrument: Instrument } ) => {
return (<div><div className="name"> {props.instrument.name}</div><img className="kep" src={props.instrument.imageUrl
} /> </div>);
}

export default App;
