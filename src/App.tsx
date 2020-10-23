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
  const [instrumentsResponse, updateInstruments] = useState<
    InstrumentsResponse | undefined
  >(undefined);

  const [email, updateEmail] = useState("");

  const onEmailChange = (event: any) => {
    updateEmail(event.target.value);
  };

  const [password, updatePassword] = useState("");

  // const router = useRouter();
  // const route = useRoute();

  // if (route.path == "/login" && Backend.isLoggedIn()) {
  //   router.push("/dashboard");
  // }

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

      // router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
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
          <Login />
          <button type="submit" className="BejelentkezesGomb">
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
