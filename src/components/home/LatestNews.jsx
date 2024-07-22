import React from "react";
import styles from "./home.module.css";
import doctorImg from "../../assets/doctor.png";
import detoxImg from "../../assets/detox.png";

function LatestNews() {
  return (
    <div className={styles.LatestNews}>
      <h6>Blog & News</h6>
      <h2>Read Our Latest News</h2>
      <div className={styles.LatestNewsCards}>
        {["card-1", "card-2", "card-3"].map((card) => (
          <Card key={"latest-news" + card} />
        ))}
      </div>
    </div>
  );
}
const Card = () => {
  return (
    <div className={`${styles.Card} ${styles.LatestNewsCard} `}>
      <img src={detoxImg} alt="detox" />
      <h5>Medical &nbsp;&nbsp;&nbsp;March 31, 2022</h5>
      <p>6 Tips To Protect Your Mental Health When You’re Sick</p>
      <Persona />
    </div>
  );
};

const Persona = () => {
  return (
    <div className={styles.LatestNewsPersona}>
      <img src={doctorImg} alt="persona" />
      <p>Rebecca Lee</p>
    </div>
  );
};

export default LatestNews;
