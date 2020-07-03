import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "./../../Burger/Burger";
import Button from "./../../UI/Buttons/Buttons";

const checkoutSummary = props => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>Enjoy you Burger!</h1>
      <div className={classes.order}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked={props.checkoutCanceled}>
        Cancel
      </Button>
      <Button type="Success" clicked={props.checkoutContinue}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
