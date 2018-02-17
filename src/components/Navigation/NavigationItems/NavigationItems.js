import React from 'react';
import classes from './NavigationItems.css';
import './NavigationItem/NavigationItem';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
  const auth = props.isLoggedin ? (
    <NavigationItem link="/logout">Logout</NavigationItem>
  ) : (
    <NavigationItem link="/auth">Login</NavigationItem>
  );
  const orders = props.isLoggedin ? <NavigationItem link="/orders">Orders</NavigationItem> : null;
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {orders}
      {auth}
    </ul>
  );
};

export default NavigationItems;
