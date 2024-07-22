import React from "react";
import styles from "./components.module.css";
import { Logo } from "./Logo";
import { socialMedia } from "../assets/data/socialMedia";
import { FooterLinks } from "../assets/data/footerLinks";

function Footer() {
  return (
    <footer>
      <Content />
      <hr />
      <CopyRights />
    </footer>
  );
}

const Content = () => {
  return (
    <div className={styles.Content}>
      <div className={styles.logoAndSocialMedia}>
        <Logo />
        <SocialMedia />
      </div>
      <div className={styles.links}>
        {FooterLinks.map((links, index) => (
          <a key={links.name + "-" + index + "-footer-link"} href={links.link}>
            {links.name}
          </a>
        ))}
      </div>
    </div>
  );
};

const SocialMedia = () => {
  return (
    <div className={styles.SocialMedia}>
      {socialMedia.map((sm) => (
        <SocialMediaIcon key={sm.name + "-icon"} link={sm.link} name={sm.name}>
          {sm.svg}
        </SocialMediaIcon>
      ))}
    </div>
  );
};

const SocialMediaIcon = ({ name, link, children }) => {
  return (
    <div title={name} className={styles.SocialMediaIcon}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </div>
  );
};

const CopyRights = () => {
  return (
    <p className={styles.CopyRights}>
      Copyright ©2023 Surya Nursing Home.com. All Rights Reserved
    </p>
  );
};
export default Footer;
