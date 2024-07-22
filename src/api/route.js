export const stateListURL = "https://meddata-backend.onrender.com/states";
export const getCityURL = (state) =>
  `https://meddata-backend.onrender.com/cities/${state}`;
export const getMedicalCenter = (state, city) =>
  `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`;
