import React, { Context, createContext, useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import Register from "./components/Register";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { setTheme } from "flowbite-react/dist/types/theme-store";
import Login from "./components/Login";
import FavCards from "./components/FavCard";
import { jwtDecode } from "jwt-decode";
  


export let SearchContext: Context<any> = createContext({});
export let ThemeContext: Context<any> = createContext({});
export let UserContext: Context<any> = createContext({});

function App() {

  let [search, setSearch] = useState<string>("");
  let [user, setUser] = useState<any>({});
  let [Theme, setTheme] = useState<any>(
    {color: "#000",
    backGroundColor: "#fff",
  });
  function changeSearch(title: string) {
    setSearch(title);
  }
  useEffect(() => {
    let userId = jwtDecode(
      (localStorage.getItem("token") as string) || ""
    ) as any;
    if (userId._id != undefined) {
      setUser(userId);
    }
  }, []);
   
  return (
    <div>
      <ThemeContext.Provider value={{Theme,setTheme}} >
        <UserContext.Provider value={{user, setUser }} >
          
        
      <Router>
        
        <SearchContext.Provider value={{ search, changeSearch }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/fav" element={<FavCards />}></Route>
          </Routes>
        </SearchContext.Provider>
      <ToastContainer />
      </Router>
</UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
