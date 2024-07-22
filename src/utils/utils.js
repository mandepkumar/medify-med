export const formatFirstWordCapital = (text) =>
  text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
export const convertToDate = (timeStamp) => {
  const fullDate = new Date(timeStamp);
  const date = fullDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = fullDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return { date, time };
};
export const formatDateForSlot = (timeStamp) => {
  const date = new Date(timeStamp);
  const options = { weekday: "short", day: "numeric", month: "short" };
  return date.toLocaleDateString("en-US", options);
};
export const incrementDay = (days) => {
  const todayDate = new Date();
  return todayDate.setDate(todayDate.getDate() + days);
};

export const isSlotAvailable = (time, dayCount) => {
  const currDate = new Date();
  const givenDate = new Date(
    `${new Date(incrementDay(dayCount)).toLocaleDateString()} ${time}`
  );
  return currDate < givenDate;
};

export const formatDate = (days) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format the date
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
};
