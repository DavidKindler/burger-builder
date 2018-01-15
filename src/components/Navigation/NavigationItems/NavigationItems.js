import React from 'react';
import classes from './NavigationItems.css';
import './NavigationItem/NavigationItem';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  console.log(props.isLoggedin);
  const auth = props.isLoggedin ? (
    <NavigationItem link="/logout">Logout</NavigationItem>
  ) : (
    <NavigationItem link="/auth">Login</NavigationItem>
  );
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {auth}
    </ul>
  );
};

export default navigationItems;
