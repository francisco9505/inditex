import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home.jsx";
import "./index.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";

const Main =()=>{
  const [isLoading,setIsLoading]=useState(false)
  return(
    <React.StrictMode>
  <BrowserRouter>
  <NavBar isLoading={isLoading}/>
  <Routes>
    <Route path="/" element={<Home  setIsLoading={setIsLoading}/>} />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
