import React, { useState } from "react";
import { MedicalCenterSearchForm } from "../home/SearchPanel";
import styles from "./find-doctors.module.css";
import HospitalVerified from "../../assets/hospital-verified.png";
import {
  formatDate,
  formatDateForSlot,
  formatFirstWordCapital,
  incrementDay,
  isSlotAvailable,
} from "../../utils/utils";
import { Button, Loading } from "../FormControl";
import { useDatePagination } from "../../hook/useDatePagination";
import { TimeSlotsOfDay } from "../../assets/data/timeSlots";
import useStore from "../../hook/useStore";
import AdsImg from "../../assets/ads/sensodyne_dweb.jpg";

const FindCenter = () => {
  const [centers, setCenters] = useState([]);
  const [loadingCenter, setLoadingCenter] = useState(false);
  const [openedBookingId, setOpenedBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});

  return (
    <div className={styles.findCenter}>
      <div className={styles.searchBoxBg}>
        <div className={styles.searchBoxPrimary}></div>
        <div className={styles.searchBoxLight}></div>
        <div className={styles.searchBox}>
          <MedicalCenterSearchForm
            setCenters={setCenters}
            setLoading={setLoadingCenter}
          />
        </div>
      </div>
      {loadingCenter && (
        <div className={styles.loadingCenter}>
          <Loading message={"Getting Medical centers for you. Please Wait!"} />
        </div>
      )}

      {centers && centers.length > 0 ? (
        <div className={styles.medicalCenterMain}>
          <ResultMessage
            heading={`${centers.length} medical centers available in ${centers[0]["State"]}`}
          />
          <div className={styles.centerListAndAds}>
            <div className={styles.centerListColumn}>
              {centers.map((center) => (
                <MedicalCenterTab
                  key={center["Provider ID"]}
                  data={center}
                  bookingDetails={bookingDetails}
                  setBookingDetails={setBookingDetails}
                  openBooking={openedBookingId === center["Provider ID"]}
                  setOpenedBookingId={setOpenedBookingId}
                  onSlotClick={(time, date) =>
                    setBookingDetails((prev) => ({
                      ...prev,
                      slot: { time, date },
                    }))
                  }
                  onClick={() => {
                    setOpenedBookingId((prev) =>
                      prev === center["Provider ID"]
                        ? ""
                        : center["Provider ID"]
                    );
                    setBookingDetails((prev) => ({ ...prev, center }));
                  }}
                />
              ))}
            </div>
            <div className={styles.adsColumn}>
              {" "}
              <img src={AdsImg} alt="advertisement" />
            </div>
          </div>
        </div>
      ) : (
        !loadingCenter && (
          <div className={styles.loadingCenter}>
            <Loading
              hideSpinner
              message={"Please fill the State and city and search the"}
            />
          </div>
        )
      )}
    </div>
  );
};

const ResultMessage = ({ heading }) => {
  return (
    <div className={styles.ResultMessage}>
      <h3>{heading} </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: ".2rem 0 .5rem .5rem",
          gap: ".5rem",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_59_1307)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9993 20.0002L9.04836 20.8081L7.55511 19.3151L5.44356 19.3149L4.6353 17.3642L2.68456 16.5559L2.68434 14.4444L1.19141 12.9511L1.99926 11.0002L1.19141 9.04933L2.68434 7.55608L2.68456 5.44453L4.6353 4.63627L5.44356 2.68553L7.55511 2.68531L9.04836 1.19238L10.9993 2.00023L12.9502 1.19238L14.4435 2.68531L16.555 2.68553L17.3633 4.63627L19.314 5.44453L19.3142 7.55608L20.8072 9.04933L19.9993 11.0002L20.8072 12.9511L19.3142 14.4444L19.314 16.5559L17.3633 17.3642L16.555 19.3149L14.4435 19.3151L12.9502 20.8081L10.9993 20.0002Z"
              fill="#F0F0F5"
              stroke="#2D2D32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.96074 11.2123C6.70382 10.9584 6.28726 10.9584 6.03034 11.2123C5.77342 11.4662 5.77342 11.8778 6.03034 12.1317L9.10051 15.1658C9.35744 15.4197 9.77399 15.4197 10.0309 15.1658L16.1713 9.09767C16.4282 8.84377 16.4282 8.43212 16.1713 8.17822C15.9143 7.92432 15.4978 7.92432 15.2409 8.17822L9.56572 13.7866L6.96074 11.2123Z"
              fill="#2D2D32"
              stroke="#2D2D32"
              strokeWidth="0.506465"
            />
          </g>
          <defs>
            <clipPath id="clip0_59_1307">
              <rect width="22" height="22" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p
          style={{
            color: "#787887",
            fontWeight: "400",
          }}
        >
          Book appointments with minimum wait-time & verified doctor details
        </p>
      </div>
    </div>
  );
};

export const MedicalCenterTab = ({
  data,
  openBooking,
  setOpenedBookingId,
  onClick,
  bookingDetails,
  onSlotClick,
  nonInteractive,
  setBookingDetails,
  appointmentDateTime,
}) => {
  return (
    <section className={styles.medicalCenterTab}>
      <MedicalCenterInfo
        data={data}
        setBookingDetails={setBookingDetails}
        setOpenedBookingId={setOpenedBookingId}
        bookingDetails={nonInteractive ? undefined : bookingDetails}
        onClick={nonInteractive ? undefined : onClick}
        nonInteractive={nonInteractive}
        appointmentDateTime={appointmentDateTime}
      />
      {openBooking && (
        <>
          <hr />
          <BookingCalender
            onSlotClick={onSlotClick}
            selectedSlot={bookingDetails.slot}
          />
        </>
      )}
    </section>
  );
};

const MedicalCenterInfo = ({
  data,
  setBookingDetails,
  setOpenedBookingId,
  bookingDetails,
  appointmentDateTime,
  onClick,
  nonInteractive,
}) => {
  const name = data["Hospital Name"];
  const address = data.City + ", " + data.State;
  const type = data["Hospital Type"];
  const rating = data["Hospital overall rating"];
  //const pinCode = data["ZIP Code"];

  const { getStore, saveStore } = useStore();
  const store = getStore();
  const handleBooking = () => {
    //debugger;
    if (!bookingDetails.center) {
      setBookingDetails((prev) => ({ ...prev, center: data }));
      setOpenedBookingId(data["Provider ID"]);
      alert("Please select center and time Slot to book ");
      return;
    }
    if (!bookingDetails.slot) {
      alert("Please select anyone time Slot to book ");
      return;
    }
    store["my-booking"] = [
      ...(store["my-booking"] ?? []),
      {
        ...bookingDetails,
        bookingId: Date.now(),
      },
    ];
    saveStore(store);
    setBookingDetails({});
    alert("Booked!");
  };
  return (
    <div className={styles.MedicalCenterInfo}>
      <div
        className={`${styles.ImgAndInfo} ${
          nonInteractive ? styles.ImgAndInfoNonActive : ""
        }`}
        onClick={onClick}
      >
        <img src={HospitalVerified} alt="hospital verified" />
        <div className={styles.Info}>
          <div className={styles.InfoText}>
            <h3>{formatFirstWordCapital(name)}</h3>
            <h5>{formatFirstWordCapital(address)}</h5>
            <p>{type}</p>
            <ConsultationOffer />
          </div>
          <hr />
          <Rating rate={rating} />
        </div>
      </div>
      <div className={styles.TimeAndBooking}>
        {appointmentDateTime ? (
          <TimeDate
            date={appointmentDateTime.date}
            time={appointmentDateTime.time}
          />
        ) : (
          <div></div>
        )}
        {!appointmentDateTime ? (
          <div className={styles.booking}>
            <p>Available Today</p>
            <Button onClick={handleBooking}>Book FREE Center Visit</Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

const TimeDate = ({ date, time }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <Pill content={time} />
      <Pill content={date} secondary />
    </div>
  );
};

const Pill = ({
  content,
  secondary,
  disable,
  selectable,
  selected,
  onSlotClick,
  value,
}) => {
  const currColor = selected
    ? "white"
    : disable
    ? "var( --grey-text2-color)"
    : secondary
    ? "#007100"
    : "#45b3ff";
  const currFW = secondary ? "700" : "400";

  return (
    <div
      style={{
        color: currColor,
        padding: secondary ? ".5rem 1.2rem" : ".5rem .8rem",
        border: `1px solid ${currColor}`,
        borderRadius: ".3rem",
        fontWeight: currFW,
        textAlign: "center",
        whiteSpace: "nowrap",
        fontFamily: "Lato",
        cursor: `${
          disable ? "not-allowed" : selectable ? "pointer" : undefined
        }`,
        backgroundColor: selected ? "var(--primary-color)" : "transparent",
      }}
      className={selectable ? styles.interactivePills : undefined}
      onClick={() => {
        onSlotClick(value.time, value.date);
      }}
    >
      {content}
    </div>
  );
};

const Rating = ({ rate }) => {
  return (
    <div className={styles.Rating}>
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.967367 4.62987H2.71737V11.6299H0.967367C0.645203 11.6299 0.384033 11.3687 0.384033 11.0465V5.2132C0.384033 4.89103 0.645203 4.62987 0.967367 4.62987ZM4.05489 3.87568L7.78852 0.142072C7.89112 0.0394341 8.05364 0.0278899 8.16972 0.114976L8.66707 0.487982C8.94982 0.700036 9.07722 1.06136 8.99001 1.40385L8.31725 4.04653H12.0507C12.695 4.04653 13.2174 4.56887 13.2174 5.2132V6.44072C13.2174 6.59315 13.1875 6.74406 13.1295 6.88493L11.3244 11.2686C11.2344 11.4872 11.0214 11.6299 10.785 11.6299H4.46737C4.1452 11.6299 3.88403 11.3687 3.88403 11.0465V4.28816C3.88403 4.13345 3.94549 3.98508 4.05489 3.87568Z"
          fill="white"
        />
      </svg>
      <p>{rate}</p>
    </div>
  );
};

const ConsultationOffer = () => {
  return (
    <div className={styles.ConsultationOffer}>
      <p>FREE</p>
      <p>₹500</p>
      <p>Consultation fee at clinic</p>
    </div>
  );
};
const BookingCalender = ({ onSlotClick, selectedSlot }) => {
  const {
    currDay,
    moveNextDay,
    movePrevDay,
    range,
    setDay,
    isFirstDay,
    isLastDay,
  } = useDatePagination(window.innerWidth < 700);

  return (
    <div className={styles.BookingCalender}>
      <PaginatedDate
        currDay={currDay}
        setDay={setDay}
        range={range}
        movePrevDay={movePrevDay}
        moveNextDay={moveNextDay}
        disablePrev={isFirstDay}
        disableNext={isLastDay}
      />
      <DayTimeSlotChart
        currDay={currDay}
        onSlotClick={onSlotClick}
        selectedSlot={selectedSlot}
      />
    </div>
  );
};

const PaginatedDate = ({
  currDay,
  range,
  moveNextDay,
  movePrevDay,
  setDay,
  disablePrev,
  disableNext,
}) => {
  return (
    <div className={styles.PaginatedDate}>
      <PaginationBtn isPrevious onClick={movePrevDay} disable={disablePrev} />
      <Pagination currDate={currDay} setDay={setDay} dateSlot={range} />
      <PaginationBtn onClick={moveNextDay} disable={disableNext} />
    </div>
  );
};

const PaginationBtn = ({ onClick, disable, isPrevious }) => {
  return (
    <button
      style={{
        opacity: `${disable ? "0.4" : "1"}`,
        cursor: `${disable ? "not-allowed" : "pointer"}`,
      }}
      className={styles.PaginationBtn}
      onClick={onClick}
    >
      {isPrevious ? (
        <svg
          width="8"
          height="11"
          viewBox="0 0 8 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.02391 5.62068L7.14868 9.74552L5.97017 10.924L0.666831 5.62068L5.97017 0.317383L7.14868 1.4959L3.02391 5.62068Z"
            fill={disable ? "var(--grey-svg-color)" : "#2AA7FF"}
          />
        </svg>
      ) : (
        <svg
          width="8"
          height="11"
          viewBox="0 0 8 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.97584 5.61955L0.851074 1.49472L2.02958 0.316217L7.33292 5.61955L2.02958 10.9229L0.851074 9.74433L4.97584 5.61955Z"
            fill={disable ? "var(--grey-svg-color)" : "#2AA7FF"}
          />
        </svg>
      )}
    </button>
  );
};

const Pagination = ({ currDate, dateSlot, setDay }) => {
  return (
    <div className={styles.Pagination}>
      {dateSlot.map((date, idx) => (
        <DateSlot
          key={"pagination-" + idx}
          date={date}
          setDate={setDay}
          isActive={date === currDate}
        />
      ))}
    </div>
  );
};

const DateSlot = ({ date, setDate, isActive }) => {
  const availableSlotsCount = TimeSlotsOfDay.map(
    (timeSlot) =>
      timeSlot.slots.filter((ts) => isSlotAvailable(ts.time, date)).length
  ).reduce((acc, curr) => curr + acc, 0);

  const heading =
    date === 0
      ? "Today"
      : date === 1
      ? "Tomorrow"
      : formatDateForSlot(incrementDay(date));
  return (
    <div className={styles.DateSlot} onClick={() => setDate(date)}>
      <div>
        <h4
          style={{
            fontWeight: `${isActive ? "700" : "400"}`,
          }}
        >
          {heading}
        </h4>
        <p>
          {availableSlotsCount === 0
            ? "No Slots Available"
            : `${availableSlotsCount} Slots Available `}
        </p>
      </div>
      <div
        style={{
          borderBottom: `4px solid ${
            isActive ? "var(--primary-color)" : "#F0F0F5"
          }`,
        }}
        className={styles.DateSlotIndicator}
      ></div>
    </div>
  );
};

const DayTimeSlotChart = ({ currDay, onSlotClick, selectedSlot }) => {
  return (
    <div className={styles.DayTimeSlotChart}>
      {TimeSlotsOfDay.map((slot, index) => (
        <React.Fragment key={"timeSlot-" + index}>
          <TimeSlotStrip
            date={currDay}
            duration={slot.duration}
            timeSlots={slot.slots}
            onSlotClick={onSlotClick}
            selectedSlot={selectedSlot}
          />
          {index !== TimeSlotsOfDay.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </div>
  );
};

const TimeSlotStrip = ({
  date,
  duration,
  timeSlots,
  onSlotClick,
  selectedSlot,
}) => {
  return (
    <div className={styles.TimeSlotStrip}>
      <p>{duration}</p>
      <div>
        {timeSlots
          .filter((ts) => isSlotAvailable(ts.time, date))
          .map((ts, idx) => (
            <Pill
              key={ts.duration + "-" + idx}
              content={ts.display}
              selectable
              selected={selectedSlot?.time === ts.display}
              onSlotClick={onSlotClick}
              value={{ time: ts.display, date: formatDate(date) }}
            />
          ))}
      </div>
    </div>
  );
};

export default FindCenter;
