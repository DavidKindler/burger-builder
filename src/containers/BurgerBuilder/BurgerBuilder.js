import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      // salad: 2,
      // bacon: 1,
      // cheese: 2,
      // meat: 2
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Aux>
    );
  }
}
