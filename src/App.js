import React from "react";
import Popular from "./components/Popular";
import { useGlobalContext } from "./context/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import HomePage from "./components/HomePage";

function App() {
  const global = useGlobalContext();
  console.log(global);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/anime/:id" element={<AnimeItem/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
