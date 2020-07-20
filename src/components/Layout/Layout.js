import React, { Component } from "react";
import Aux from "./../../HOC/Aux";
import classes from "./Layout.module.css";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          openSideDrawer={this.sideDrawerOpenHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
