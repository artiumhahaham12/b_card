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
import MyCards from "./components/MyCards";
import CreateNewCard from "./components/CreateNewCard";
import UpadateCard from "./components/UpadateCard";
import MoreDatails from "./components/MoreDetails";
import About from "./components/About";
import Sandbox from "./components/Sanbox";
import UpdateUser from "./components/UpdateUser";
import Sppiner from "./components/Sppiner";
import MyNavbar from "./components/MyNavbar";
  


export let SearchContext: Context<any> = createContext({});
export let ThemeContext: Context<any> = createContext("light");
export let UserContext: Context<any> = createContext({});

function App() {

  let [search, setSearch] = useState<string>("");
  let [user, setUser] = useState<any>({});
  let [theme, setTheme] = useState<any>(
    "light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    
  };
   useEffect(() => {
     document.documentElement.setAttribute("data-bs-theme", theme);
   }, [theme]);
  function changeSearch(title: string) {
    setSearch(title);
  }
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      let userId = jwtDecode(
        (localStorage.getItem("token") as string) || ""
      ) as any;
      if (userId._id != undefined) {
        setUser(userId);
      }
    }
    }, []);
    
  return (
    <div>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <SearchContext.Provider value={{ search, changeSearch }}>
              
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/About" element={<About />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/fav" element={<FavCards />}></Route>
                <Route path="/my-cards" element={<MyCards />}></Route>
                <Route path="/sandbox" element={<Sandbox />}></Route>
                <Route path="/sppiner" element={<Sppiner />}></Route>
                <Route
                  path="/update-user/:id"
                  element={<UpdateUser />}
                ></Route>
                <Route path="/add-Card" element={<CreateNewCard />}></Route>
                <Route
                  path="/update-Card/:id"
                  element={<UpadateCard />}
                ></Route>
                <Route path="/details/:id" element={<MoreDatails />}></Route>
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
