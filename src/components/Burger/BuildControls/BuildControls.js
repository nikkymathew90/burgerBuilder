import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import Aux from "./../../../HOC/Aux";

const controls = [
  { label: "Salab", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <Aux>
    <div className={classes.BuildControls}>
      <p style={{ color: "white" }}>
        Total price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGNIN TO ORDER"}
      </button>
    </div>
  </Aux>
);
export default buildControls;
