import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import DownloadApp from "../components/DownloadApp";
import FAQImg from "../assets/faq.png";

function MainLayout() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <img
        style={{
          paddingLeft: "var(--page-padding-inline)",
          paddingRight: "var(--page-padding-inline)",
          paddingTop: "1rem",
          paddingBottom: "2rem",
          backgroundColor: "white",
        }}
        src={FAQImg}
        alt="faq"
      />
      <DownloadApp />
      <Footer />
    </>
  );
}

export default MainLayout;
