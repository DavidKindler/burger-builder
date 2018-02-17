import React from 'react';
import classes from './NavigationItems.css';
// import './NavigationItem/NavigationItem';
// import NavigationItem from './NavigationItem/NavigationItem';

const Foo = props => {
  const auth = props.isLoggedin ? <a href="/logout">Logout</a> : <a href="/auth">Login</a>;
  const orders = props.isLoggedin ? <a href="/orders">Orders</a> : null;
  return (
    <div className={classes.NavigationItems}>
      <a href="/">Burger Builder</a>
      {orders}
      {auth}
    </div>
  );
};

export default Foo;
