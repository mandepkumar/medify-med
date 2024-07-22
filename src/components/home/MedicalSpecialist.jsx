import React from "react";
import styles from "./home.module.css";
import Carousel from "./Carousel";
import doctorList from "../../assets/data/specialist.json";

function MedicalSpecialist() {
  return (
    <div className={styles.MedicalSpecialist}>
      <h2>Our Medical Specialist</h2>
      <Carousel>
        {doctorList.map((doctor) => (
          <DoctorInfo
            key={doctor.id}
            name={doctor.name}
            branch={doctor.specialist}
            src={require(`../../assets/specialist/${doctor.img}`)}
          />
        ))}
      </Carousel>
    </div>
  );
}

const DoctorInfo = ({ src, name, branch }) => {
  return (
    <div className={styles.DoctorInfo}>
      <div className={styles.DoctorInfoBg}>
        <img src={src} alt={name} />
      </div>
      <h4>{name}</h4>
      <h6>{branch}</h6>
    </div>
  );
};

export default MedicalSpecialist;
