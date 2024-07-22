import React, { useEffect, useState } from "react";
import useStore from "../hook/useStore";
import { Logo } from "./Logo";
import { Button } from "./FormControl";
import style from "./components.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { getStoreItem } = useStore();
  const headerData = getStoreItem("header");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const navList = [
    { href: "/find-doctors", name: "Find Doctors" },
    { href: "/hospital", name: "Hospitals" },
    { href: "/medicines", name: "Medicines" },
    { href: "/surgeries", name: "Surgeries" },
    { href: "/providers", name: "Software for Provider" },
    { href: "/facilities", name: "Facilities" },
  ];

  return (
    <header className={style.header}>
      <Info text={headerData.infoText} />
      <nav className={style.navFull}>
        <Logo />
        <ul>
          {navList.map((list, index) => (
            <NavTabList
              list={list}
              key={"nav-" + index}
              isActive={list.href === pathname}
            />
          ))}
          <li style={{ paddingBlock: "1rem" }}>
            <Button onClick={() => navigate("/my-booking")}>My Bookings</Button>
          </li>
        </ul>
      </nav>

      <nav className={style.navSmall}>
        <div className={style.nav}>
          <Logo />
          <SVG onClick={() => setNavOpen((prev) => !prev)} closed={navOpen} />
        </div>
        {navOpen && (
          <ul>
            {navList.map((list, index) => (
              <NavTabList
                list={list}
                key={"nav-" + index}
                isActive={list.href === pathname}
              />
            ))}
            <li style={{ paddingBlock: "1rem" }}>
              <Button onClick={() => navigate("/my-booking")}>
                My Bookings
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

const SVG = ({ closed, onClick }) => {
  return closed ? (
    <svg
      fill="var(--primary-color)"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z" />
    </svg>
  ) : (
    <svg
      fill="var(--primary-color)"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        d="M6 13C6.55 13 7 12.55 7 12C7 11.45 6.55 11 6 11C5.45 11 5 11.45 5 12C5 12.55 5.45 13 6 13Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M6 7C6.55 7 7 6.55 7 6C7 5.45 6.55 5 6 5C5.45 5 5 5.45 5 6C5 6.55 5.45 7 6 7Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M6 19C6.55 19 7 18.55 7 18C7 17.45 6.55 17 6 17C5.45 17 5 17.45 5 18C5 18.55 5.45 19 6 19Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M12 7C12.55 7 13 6.55 13 6C13 5.45 12.55 5 12 5C11.45 5 11 5.45 11 6C11 6.55 11.45 7 12 7Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M12 19C12.55 19 13 18.55 13 18C13 17.45 12.55 17 12 17C11.45 17 11 17.45 11 18C11 18.55 11.45 19 12 19Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M18 13C18.55 13 19 12.55 19 12C19 11.45 18.55 11 18 11C17.45 11 17 11.45 17 12C17 12.55 17.45 13 18 13Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M18 7C18.55 7 19 6.55 19 6C19 5.45 18.55 5 18 5C17.45 5 17 5.45 17 6C17 6.55 17.45 7 18 7Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
      <path
        d="M18 19C18.55 19 19 18.55 19 18C19 17.45 18.55 17 18 17C17.45 17 17 17.45 17 18C17 18.55 17.45 19 18 19Z"
        stroke="var(--primary-color)"
        strokeWidth="2"
      />
    </svg>
  );
};

const NavTabList = ({ list, isActive }) => {
  return (
    <li>
      <a
        className={isActive ? style.activeNav : ""}
        style={{
          fontWeight: isActive ? "600" : undefined,
          color: isActive ? "var( --primary-color)" : undefined,
        }}
        href={list.href}
      >
        {list.name}
      </a>
    </li>
  );
};

const Info = ({ text }) => {
  return <p className={style.info}> {text}</p>;
};
export default Header;
