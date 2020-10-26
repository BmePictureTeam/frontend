import React from "react";
import { useHistory } from "react-router-dom";
import { Backend } from "./service/backend";

export function Root() {
    const history = useHistory();
    if (Backend.isLoggedIn()) {
        history.push("/dashboard")
      } else {
        history.push("/login")
      }
    return <div></div>
}