import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "./../../axios-orders";
import withErrorHandler from "./../../HOC/withErrorHandler";
import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "./../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onLoadOrders();
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              ingredients={order.ingredients}
              price={order.price}
              key={order.id}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const matchDispatchToProps = dispatch => {
  return {
    onLoadOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withErrorHandler(Orders, axios));
