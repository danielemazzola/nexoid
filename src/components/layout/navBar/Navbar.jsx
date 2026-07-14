import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import navbar from "../../../data/navbar.js";
import logo from "../../../assets/img/nexoid_1.png";
import BtnFloat from "../../btn_floaut_contact/btn_float.jsx";

import "./Navbar.css";

function Navbar() {
  const [toogleMenu, setToogleMenu] = useState(false);

  const handleToogleMenu = () => {
    setToogleMenu((prev) => !prev);
  };

  return (
    <nav className="filter">
      <div className="container_navbar">
        <div className="container_nav">
          <div className={`btn_toogle_menu ${toogleMenu ? "animation_menu_open" : "animation_menu_close"} `} onClick={handleToogleMenu}>
            <span className="line_menu"></span>
            <span className="line_menu"></span>
            <span className="line_menu"></span>
          </div>
          <Link to={navbar[0].path}>
            <img src={logo} alt={navbar[0].title} className="img_logo" />
          </Link>
          <BtnFloat props={navbar[5]} />
        </div>
        {/**MENU */}
      </div>

      <div
        className={`container_nav_options ${toogleMenu ? "show_menu" : "toogle_false"}`}
      >
        {navbar
          .filter((item) => item.id !== 1 && item.id !== 6)
          .map((item) => (
            <Link
              className="show_menu"
              key={item.id}
              to={item.path}
              onClick={handleToogleMenu}
            >
              {item.title}
            </Link>
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
