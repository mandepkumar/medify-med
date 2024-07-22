import React from "react";
import Carousel from "./Carousel";
import Ad1 from "../../assets/ads/ad1.png";
import Ad2 from "../../assets/ads/ad2.png";
import Ad3 from "../../assets/ads/ad3.png";
import styles from "./home.module.css";

const Ads = () => {
  return (
    <div className={styles.Ads}>
      <Carousel>
        <img src={Ad1} alt="ad 1" />
        <img src={Ad2} alt="ad 2" />
        <img src={Ad3} alt="ad 3" />
        <img src={Ad1} alt="ad 1" />
        <img src={Ad2} alt="ad 2" />
        <img src={Ad3} alt="ad 3" />
      </Carousel>
    </div>
  );
};

export default Ads;
