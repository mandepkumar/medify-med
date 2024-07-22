import React from "react";
import style from "./home.module.css";
import HeroDoctors from "../../assets/hero-doctors.png";
import { Button } from "../FormControl";

function Hero() {
  return (
    <div className={style.hero}>
      <Info />
      <img src={HeroDoctors} alt="Hero doctors img" />
    </div>
  );
}

const Info = () => {
  return (
    <div className={style.info}>
      <div>
        <h2>Skip the travel! Find Online</h2>
        <h1>
          Medical <span>Centers</span>
        </h1>
      </div>
      <h3>
        Connect instantly with a 24x7 specialist or choose to <br />
        video visit a particular doctor.
      </h3>
      <Button>Find Centers</Button>
    </div>
  );
};
export default Hero;
