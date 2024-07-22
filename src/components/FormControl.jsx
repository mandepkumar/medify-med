import { useEffect, useState } from "react";
import style from "./components.module.css";

export const Button = ({ children, icon, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
};

export const Input = ({ Icon, placeholder, onChange, value }) => {
  return (
    <div className={style.input}>
      {Icon && <Icon />}
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value ? value : ""}
      />
    </div>
  );
};

export const Dropdown = ({
  Icon,
  placeholder,
  options,
  onOptionChange,
  value,
}) => {
  const [selected, setSelected] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [optionSelectionInProgress, setOptionSelectionInProgress] =
    useState(false);
  const [query, setQuery] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined || value != null) setQuery(value);
  }, [value]);

  const setOptionSelect = (option) => {
    if (!option) return;
    setSelected(option);
    setQuery(option.value);
    setShowOptions(false);
    onOptionChange(option);
  };
  return (
    <div className={style.dropdown}>
      <div className={style.input}>
        {Icon && <Icon />}
        <input
          placeholder={placeholder}
          onFocus={() => {
            setShowOptions(true);
          }}
          onBlur={() => {
            if (!optionSelectionInProgress) setShowOptions(false);
          }}
          value={query ? query : ""}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {showOptions && (
        <DropdownOptions
          options={options}
          query={query}
          setOptionSelect={setOptionSelect}
          setOptionSelectionInProgress={setOptionSelectionInProgress}
        />
      )}
    </div>
  );
};

const DropdownOptions = ({
  options,
  query,
  setOptionSelect,
  setOptionSelectionInProgress,
}) => {
  return (
    <ul>
      {!options || options.length === 0 ? (
        <li className={style.progress}>
          <Spinner />
        </li>
      ) : (
        options
          .filter((option) =>
            query
              ? String(option.value).toLowerCase().includes(query.toLowerCase())
              : true
          )
          .map((option) => (
            <li
              key={option.key}
              onClick={() => setOptionSelect(option)}
              onTouchStart={() => setOptionSelect(option)}
              onMouseEnter={() => setOptionSelectionInProgress(true)}
              onMouseLeave={() => setOptionSelectionInProgress(false)}
            >
              {option.value}
            </li>
          ))
      )}
    </ul>
  );
};

const Spinner = () => {
  return (
    <div role="status" className={style.spinner}>
      <svg
        aria-hidden="true"
        className={style.loader}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="var(--grey-svg-color)"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      <span style={{ color: "#abb6c7" }}>{"Loading..."}</span>
    </div>
  );
};

export const Loading = ({ message, hideSpinner }) => {
  return (
    <>
      {!hideSpinner && <Spinner />}
      {message}
    </>
  );
};

export const InputNumber = () => {
  return (
    <div className={style.input}>
      <p style={{ borderRight: "1px solid grey", paddingRight: ".5rem" }}>
        +91
      </p>
      <input
        placeholder="Enter phone number"
        type="number"
        maxLength="10"
        minLength="10"
      />
    </div>
  );
};
