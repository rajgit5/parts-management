import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Login() {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  async function login() {
    try {
      let data = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      if (data.status === 200) {
        console.log("success");
        window.location.href = "/product";
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1>login</h1>
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
          <button onClick={() => login()}>login</button>
          <Link to="/signup">Register</Link>
        </div>
      </div>
    </>
  );
}
