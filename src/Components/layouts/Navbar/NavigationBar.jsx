import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import "./NavigationBar.css";

export default function NavigationBar(props) {
  const { auth,handleLogout } = useContext(AuthContext);
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  return (
          <div>
          {auth === true ? <SignedIn signOut={handleLogout} /> : <SignedOut />}

          </div>
  );
}
