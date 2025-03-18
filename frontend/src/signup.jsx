import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

async function singnup() {
    try {
        let data = await axios.post("http://localhost:5000/signup", {
            email: email,
            password: password
        })
        if (data.status === 201) {
            console.log("success");
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
      <div>
        <h1>Signup</h1>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button onClick={()=>singnup()}>Signup</button>
          <Link to="/">login</Link>
        </div>
      </div>
    </>
  );
}
