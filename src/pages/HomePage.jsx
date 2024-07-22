import React from "react";
import Hero from "../components/home/Hero";
import SearchPanel from "../components/home/SearchPanel";
import Carousel from "../components/home/Carousel";
import OurFamilies from "../components/home/OurFamilies";
import LatestNews from "../components/home/LatestNews";
import PatientImg from "../assets/patientCaring.png";
import MedicalSpecialist from "../components/home/MedicalSpecialist";
import Ads from "../components/home/Ads";

const HomePage = () => {
  return (
    <>
      <Hero />
      <SearchPanel />
      <Ads />
      <MedicalSpecialist />
      {/* <img
        style={{
          paddingLeft: "var(--page-padding-inline)",
          paddingRight: "var(--page-padding-inline)",
          paddingTop: "1rem",
          paddingBottom: "2rem",
          background: "var( --gradient-blue)",
          objectFit: "cover",
        }}
        src={PatientImg}
        alt="patient"
      /> */}
      <LatestNews />
      <OurFamilies />
    </>
  );
};

export default HomePage;
