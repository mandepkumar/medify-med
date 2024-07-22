import React from "react";
import styles from "./home.module.css";
import { ourFamiliesCards } from "../../assets/data/ourFamiliesCards";

const OurFamilies = () => {
  return (
    <div className={styles.OurFamilies}>
      <div className={styles.Info}>
        <h6>CARING FOR THE HEALTH OF YOU AND YOUR FAMILY.</h6>
        <h2>Our Families</h2>
        <p>
          We will work with you to develop individualized care plans, including
          management of chronic diseases. If we cannot assist, we can provide
          referrals or advice about the type of practitioner you require. We
          treat all enquiries sensitively and in the strictest confidence.
        </p>
      </div>
      <div className={styles.Cards}>
        <div className={styles.CardEven}>
          {ourFamiliesCards
            .filter((card, index) => index % 2 === 0)
            .map((card, index) => (
              <Card
                key={card.heading + "-" + index}
                icon={card.svg}
                heading={card.heading}
                content={card.content}
              />
            ))}
        </div>
        <div className={styles.CardOdd}>
          {ourFamiliesCards
            .filter((card, index) => index % 2 === 1)
            .map((card, index) => (
              <Card
                key={card.heading + "-" + index}
                icon={card.svg}
                heading={card.heading}
                content={card.content}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, heading, content }) => {
  return (
    <div className={styles.Card}>
      {icon}
      <h2>{heading}</h2>
      <p>{content}</p>
    </div>
  );
};
export default OurFamilies;
