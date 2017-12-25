import React from 'react';
import Aux from '../../hoc/ReactAux';
import classes from './Layout.css';

const Layout = props => (
  <Aux>
    <div>Toobar, sidedrawer, backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;
