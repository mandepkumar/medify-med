import React, { useState } from "react";
import styles from "./myBooking.module.css";
import useStore from "../../hook/useStore";
import { MY_BOOKING } from "../../constants/state";
import { MedicalCenterTab } from "../find-doctors/FindCenter";
import { convertStamp } from "../../utils/utils";
import AdsImg from "../../assets/ads/sensodyne_dweb.jpg";
import { Button, Input } from "../FormControl";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const MyBooking = () => {
  const { getStoreItem } = useStore();
  const myBooking = getStoreItem(MY_BOOKING);

  const [hospital, setHospital] = useState("");
  console.log(myBooking);
  return (
    <div>
      <div className={styles.searchBoxBg}>
        <div className={styles.searchBoxPrimary}>
          <h2>My Bookings</h2>
        </div>
        <div className={styles.searchBoxTab}>
          <SearchHospitalBox setHospital={setHospital} />
        </div>
      </div>

      {myBooking && myBooking.length > 0 ? (
        <div className={styles.bookingCenterMain}>
          <div className={styles.centerListAndAds}>
            <div className={styles.centerListColumn}>
              {myBooking &&
                myBooking.length > 0 &&
                myBooking
                  .filter(
                    (booking) =>
                      booking.center &&
                      String(booking.center["Hospital Name"])
                        .toLocaleLowerCase()
                        .includes(hospital)
                  )
                  .map((booking) => (
                    <MedicalCenterTab
                      key={booking.bookingId}
                      data={booking.center}
                      appointmentDateTime={booking.slot}
                      nonInteractive
                    />
                  ))}
            </div>
            <div className={styles.adsColumn}>
              <img src={AdsImg} alt="advertisement" />
            </div>
          </div>
        </div>
      ) : (
        "not found any booking "
      )}
    </div>
  );
};

const SearchHospitalBox = ({ setHospital }) => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.searchBox}>
      <Input
        placeholder="Search By Hospital"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
      <Button
        onClick={() => {
          setHospital(value);
        }}
      >
        <SearchIcon />
        Search
      </Button>
    </div>
  );
};

export default MyBooking;
