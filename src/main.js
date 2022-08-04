import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<Login />} />

        </Route>
        <Route path="/home" element={<Home />} />

      </Routes>
  </main>
);

export default Main;
