import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./styles/styles.css";
// import Home from "./components/Home.tsx";
import "../src/styles/styles.css"; // Importa el archivo CSS global
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
