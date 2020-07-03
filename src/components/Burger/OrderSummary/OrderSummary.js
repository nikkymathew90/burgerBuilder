import React, { Component } from "react";
import Aux from "../../../HOC/Aux";
import Button from "./../../UI/Buttons/Buttons";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummary updated]");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}</span> :
          {" " + this.props.ingredients[key]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <ul>{ingredientSummary}</ul>
        <p>Total Price : ${this.props.totalPrice}</p>
        <p>Continue to checkout?</p>
        <Button type="Danger" clicked={this.props.clickedCancel}>
          CANCEL
        </Button>

        <Button type="Success" clicked={this.props.clickedContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
