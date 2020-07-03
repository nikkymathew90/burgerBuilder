import React, { Component } from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./../../containers/Checkout/ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "./../../store/actions";

class Checkout extends Component {
  checkoutCanceled = () => {
    this.props.history.goBack();
  };

  checkoutContinue = () => {
    this.props.history.push("/checkout/contact-info");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const puchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {puchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCanceled={this.checkoutCanceled}
            checkoutContinue={this.checkoutContinue}
          />

          <Route
            path={this.props.match.url + "/contact-info"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
