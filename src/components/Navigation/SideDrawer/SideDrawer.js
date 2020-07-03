import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";
import Backdrop from "./../../UI/Backdrop/Backdrop";
import Aux from "./../../../HOC/Aux";

const sidedrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clickClose={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sidedrawer;
