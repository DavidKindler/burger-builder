import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger Builder" style={{height: props.height}} />
    </div>
  );
};

export default Logo;
