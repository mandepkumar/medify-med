import React from "react";
import logo from "../assets/logo_md.png";
import style from "./components.module.css";

export const Logo = () => {
  return (
    <div className={style.logo}>
      <a href="/" className="">
        <img src={logo} alt="Medify Logo" />
      </a>
    </div>
  );
};
