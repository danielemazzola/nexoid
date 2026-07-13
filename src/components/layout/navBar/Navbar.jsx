import { Link } from "react-router-dom";
import navbar from "../../../data/navbar.js";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="filter">
      <div>
        <div className="logo link_color">
          <Link key={navbar[0].id} to={navbar[0].path}>
            {navbar[0].title}
          </Link>
        </div>
        <div className="links link_color">
          {navbar.map((item, index) =>
            item.id === 1 ? null : (
              <Link key={item.id} to={item.path}>
                {item.title}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
