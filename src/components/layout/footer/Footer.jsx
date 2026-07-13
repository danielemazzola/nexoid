import { Link } from "react-router-dom";
import data_footer from "../../../data/footer.js";
import navbar from "../../../data/navbar.js";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  const yearRange = year !== 2026 ? `2026 - ${year}` : year;
  return (
    <footer>
      <div>
        <ul>
          {navbar.map((item, index) =>
            item.id <= 2 ? null : (
              <Link key={item.id} to={item.path}>
                {item.title}
              </Link>
            ),
          )}
          {data_footer.legal.map((link) => (
            <Link key={link.id} to={link.path}>
              {link.title}
            </Link>
          ))}
        </ul>
        <div>
          <i>
            {data_footer.copyright} © {yearRange} - All rights reserved.
          </i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
