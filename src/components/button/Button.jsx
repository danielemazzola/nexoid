import { Link } from "react-router-dom";

const Button = ({value, href}) => {
  return (
    <button>
      <Link to={href}>{value}</Link>
    </button>
  );
};

export default Button;
