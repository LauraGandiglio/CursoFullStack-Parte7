import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";

const NavBar = ({ user, closeSesion }) => {
  return (
    <div className="navbar">
      <div>
        <Link to="/logged">Blogs</Link>
        <Link to="/users">Users</Link>
      </div>

      <span>¡Hi {user.name}! you are logged in </span>
      <button className="logout" onClick={closeSesion}>
        <FaPowerOff />
      </button>
    </div>
  );
};

export default NavBar;
