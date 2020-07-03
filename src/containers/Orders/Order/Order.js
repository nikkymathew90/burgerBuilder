import React from "react";
import classes from "./Order.module.css";

const order = props => {
  return (
    <div className={classes.Order}>
      <span>Ingredients</span>
      {Object.keys(props.ingredients).map(igrKey => {
        return (
          <span className={classes.Ingredient}>
            {igrKey}: ({props.ingredients[igrKey]})
          </span>
        );
      })}

      <p>
        Price : <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default order;
