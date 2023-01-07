import React, { useState } from "react";
import Axios from "axios";

export default function Register({ etablissement }) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [type, setType] = useState("");
  const [numeroAgrement, setnumeroAgrement] = useState("");
  const [directionUserName, setdirectionUserName] = useState("");
  const [directionPasseword, setdirectionPasseword] = useState("");
  const [directiontype, setDirectionType] = useState("");
  const [wilaya, setwilaya] = useState("");
  const [service, setservice] = useState("");
  const [loginStatus] = useState("");

  const register = () => {
    if (etablissement === "مركز") {
      Axios.post(process.env.REACT_APP_API_URL + "/register_centre", {
        username: usernameReg,
        password: passwordReg,
        type: type,
        numeroAgrement: numeroAgrement,
      }).then(() => {
        alert("inserted");
      });
    }
    if (etablissement === "marchandise" || etablissement === "formation") {
      Axios.post(process.env.REACT_APP_API_URL + "/register_service", {
        username: directionUserName,
        wilaya: wilaya,
        service: service,
        type: directiontype,
        password: directionPasseword,
      }).then(() => {
        alert("inserted");
      });
    }
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration centre</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>type</label>
        <input
          type="text"
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <label>Numero d'agrement</label>
        <input
          type="text"
          onChange={(e) => {
            setnumeroAgrement(e.target.value);
          }}
        />
        <button
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
      </div>
      <div className="registration">
        <h1>Registration Direction</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setdirectionUserName(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setdirectionPasseword(e.target.value);
          }}
        />
        <label>type</label>
        <input
          type="text"
          onChange={(e) => {
            setDirectionType(e.target.value);
          }}
        />
        <label>wilaya</label>
        <input
          type="text"
          onChange={(e) => {
            setwilaya(e.target.value);
          }}
        />
        <label>service</label>
        <input
          type="text"
          onChange={(e) => {
            setservice(e.target.value);
          }}
        />
        <button
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}
