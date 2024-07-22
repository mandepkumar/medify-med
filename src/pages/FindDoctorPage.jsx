import React from "react";
import style from "./pages.module.css";
import FindCenter from "../components/find-doctors/FindCenter";

const FindDoctorPage = () => {
  return (
    <div className={style.FindDoctorPage}>
      <FindCenter />
    </div>
  );
};

export default FindDoctorPage;
