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
      <div>
        <div>
          <div className="logo link_color">
            <Link to={navbar[0].path}>
              <img src={logo} alt={navbar[0].title} className="img_logo" />
            </Link>
            <div className="btn_toogle_menu" onClick={handleToogleMenu}>
              <p>Menú</p>
            </div>
          </div>

          <div className="link_color">
            <div
              className={`links ${toogleMenu ? "show_menu_toogle filter fadeIn" : ""}`}
            >
              {navbar
                .filter(
                  (item) => item.id !== 1 && item.id !== 2 && item.id !== 6,
                )
                .map((item) => (
                  <Link className="show_menu" key={item.id} to={item.path}>
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div>
          <BtnFloat props={navbar[5]} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
