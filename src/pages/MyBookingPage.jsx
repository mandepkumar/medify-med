import React from "react";
import MyBooking from "../components/my-booking/MyBooking";
import style from "./pages.module.css";

export const MyBookingPage = () => {
  return (
    <div className={style.MyBookingPage}>
      <MyBooking />
    </div>
  );
};
