import React from "react";
import styles from "./components.module.css";
import PhoneImg from "../assets/phone.png";
import AppStoreBtnImg from "../assets/apple_store.png";
import GooglePlayBtnImg from "../assets/google_play.png";
import { ReactComponent as ArrowSvg } from "../assets/svg/arrowDrown.svg";
import { Button, InputNumber } from "./FormControl";

const DownloadApp = () => {
  return (
    <section className={styles.DownloadApp}>
      <img src={PhoneImg} alt="phone" />
      <ArrowSvg className={styles.ArrowSvg} />
      <div className={styles.DownloadAppInput}>
        <h2>
          Download the <span>Medify</span> App
        </h2>
        <p>Get the link to download the app</p>
        <div className={styles.sendFrom}>
          <InputNumber />
          <Button>Send SMS</Button>
        </div>
        <div className={styles.DownloadBtn}>
          <img src={GooglePlayBtnImg} alt="google play" />
          <img src={AppStoreBtnImg} alt="app store" />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
