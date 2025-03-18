import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./Login";
import Signup from "./signup";
import Product from "./product";
import Engineer from "./Engineer";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/engineer" element={<Engineer/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
