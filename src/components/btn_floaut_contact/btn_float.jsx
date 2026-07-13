import { Link } from "react-router-dom";
import contact from "../../assets/img/contact-us.png";

import "./btn_float.css";

const BtnFloat = ({ props }) => {
  return (
    <div className="btn_float">
      <Link key={props.id} to={props.path}>
        {props.title}
      </Link>
    </div>
  );
};

export default BtnFloat;
