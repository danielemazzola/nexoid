import { Link } from "react-router-dom";
import Dani from "../../assets/img/dani.png";
import "./btn_float.css";

const BtnFloat = ({ props }) => {
  return (
    <div className="btn_float">
      <Link to={props.path}>
        <img
          className="contact_me"
          src={Dani}
          alt="Contacto"
        />
      </Link>
    </div>
  );
};

export default BtnFloat;