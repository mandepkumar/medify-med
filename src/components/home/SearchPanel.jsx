import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input } from "../FormControl";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import styles from "./home.module.css";
import { lookingForData } from "../../assets/data/lookingfor";
import { useApi } from "../../hook/useApi";
import { getCityURL, getMedicalCenter, stateListURL } from "../../api/route";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function SearchPanel() {
  return (
    <div className={styles.searchBg}>
      <div className={styles.searchPanel}>
        <MedicalCenterSearchForm />
        <LookingTab />
      </div>
    </div>
  );
}

export const MedicalCenterSearchForm = ({ setCenters, setLoading }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const queryParamsValue =
    pathname === "/find-doctors"
      ? {
          city: queryParams.get("city"),
          state: queryParams.get("state"),
        }
      : null;

  const hasStateAndCity = queryParamsValue?.state && queryParamsValue?.city;

  const [btnClicked, setBtnClicked] = useState(hasStateAndCity ? true : false);
  const [state, setState] = useState(
    queryParamsValue ? queryParamsValue.state : ""
  );
  const [city, setCity] = useState(
    queryParamsValue ? queryParamsValue.city : ""
  );
  const { data: stateOptions } = useApi(stateListURL);
  const { data: cityOptions, refetch: refetchCity } = useApi(
    getCityURL(state),
    true
  );
  const {
    data: medicalCenterData,
    refetch: refetchMedicalCenter,
    isLoading,
  } = useApi(getMedicalCenter(state, city), true);

  useEffect(() => {
    if (state) refetchCity();
  }, [refetchCity, state]);

  useEffect(() => {
    setBtnClicked(false);
  }, [city]);

  useEffect(() => {
    if (setCenters) {
      setCenters(medicalCenterData);
      setBtnClicked(false);
    }
  }, [medicalCenterData, setCenters]);

  useEffect(() => {
    if (hasStateAndCity && btnClicked) {
      refetchMedicalCenter();
    }
  }, [btnClicked, hasStateAndCity, pathname, refetchMedicalCenter]);

  useEffect(() => {
    if (setLoading && state && city) setLoading(isLoading);
  }, [city, isLoading, setLoading, state]);

  const handleSearchCenter = (e) => {
    e.preventDefault();
    if (!state) {
      alert("Please fill the State");
      return;
    }
    if (!city) {
      alert("Please fill the city");
      return;
    }
    setBtnClicked(true);
    navigate(`/find-doctors?state=${state}&city=${city}`);
  };
  return (
    <form className={styles.searchForm}>
      <Dropdown
        placeholder="State"
        Icon={SearchIcon}
        options={
          stateOptions &&
          stateOptions.map((option) => ({
            key: option,
            value: option,
          }))
        }
        onOptionChange={(option) => {
          setState(option.key);
          setCity("");
        }}
        value={state}
      />
      <Dropdown
        placeholder="City"
        Icon={SearchIcon}
        options={
          cityOptions &&
          cityOptions.map((option) => ({
            key: option,
            value: option,
          }))
        }
        onOptionChange={(option) => setCity(option.key)}
        value={city}
      />
      <Button onClick={handleSearchCenter}>
        <SearchIcon /> Search
      </Button>
    </form>
  );
};

const LookingTab = () => {
  const [selected, setSelected] = useState(2);
  return (
    <section className={styles.tabsSections}>
      <h4>You may be looking for</h4>
      <div className={styles.tabs}>
        {lookingForData.map((tab, index) => (
          <Tab
            key={index}
            name={tab.name}
            Icon={() => tab.icon}
            id={index}
            selected={selected === index}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
    </section>
  );
};

const Tab = ({ name, Icon, selected, onClick }) => {
  return (
    <div
      className={`${styles.tab} ${selected ? styles.tabSelected : ""}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      <p>{name}</p>
    </div>
  );
};
export default SearchPanel;
