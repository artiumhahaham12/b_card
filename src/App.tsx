import React, { Context, createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PaginationHomePage from "./components/PaginationHomePage";


export let SearchContext: any = createContext({});
function App() {
  let [search, setSearch] = useState<string>("");
  function changeSearch(title: string) {
    setSearch(title);
  }
  return (
    <div>
      <Router>
          <SearchContext.Provider value={{ search, changeSearch }}>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            
        </Routes>
          </SearchContext.Provider>
      </Router>
    </div>
  );
}

export default App;
