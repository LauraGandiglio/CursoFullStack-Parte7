import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { GiCancel } from "react-icons/gi";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel1}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent toggable">
        {props.children}
        <button className="cancel" onClick={toggleVisibility}><GiCancel /></button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable'

export default Togglable;
