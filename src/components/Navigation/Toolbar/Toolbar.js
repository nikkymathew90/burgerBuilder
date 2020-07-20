import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "./../../../components/Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div onClick={props.openSideDrawer} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;
