import PropTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
const LoginForm = (props) => {
  return (
    <form className="loginForm" onSubmit={props.handleLogin}>
      <div className="loginForm-input">
        <FaRegUserCircle />
        <input
          type="text"
          value={props.username}
          name="Username"
          autoComplete="Username"
          placeholder="Username"
          onChange={props.handleUsername}
        />
      </div>
      <div className="loginForm-input">
        <RiLockPasswordLine />
        <input
          type="password"
          value={props.password}
          name="Password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={props.handlePassword}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
