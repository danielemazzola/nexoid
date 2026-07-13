import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import navbar from "../../../data/navbar.js";
import "./Navbar.css";

function Navbar() {
  const [toogleMenu, setToogleMenu] = useState(false);

  const handleToogleMenu = () => {
    setToogleMenu((prev) => !prev);
  };

  useEffect(() => {
    console.log(toogleMenu);
  }, [toogleMenu]);

  return (
    <nav className="filter">
      <div>
        <div className="logo link_color">
          <Link to={navbar[0].path}>{navbar[0].title}</Link>
        </div>

        <div className="link_color">
          <div className="btn_toogle_menu" onClick={handleToogleMenu}>
            MENU
          </div>

          <div className={`links ${toogleMenu ? "show_menu_toogle" : ""}`}>
            {navbar
              .filter((item) => item.id !== 1)
              .map((item) => (
                <Link
                  className="show_menu"
                  key={item.id}
                  to={item.path}
                  onClick={() => setToogleMenu(false)}
                >
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
