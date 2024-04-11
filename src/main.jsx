import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home.jsx";
import "./index.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
