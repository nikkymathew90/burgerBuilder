import React from "react";
import classes from "./Buttons.module.css";

const button = props => (
  <button
    className={[classes.Button, classes[props.type]].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;
