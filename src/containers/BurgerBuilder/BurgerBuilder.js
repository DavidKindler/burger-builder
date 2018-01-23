import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isLoggedin) {
      this.setState({ purchasing: true });
      this.props.onSetAuthRedirectPath('/checkout');
    } else {
      this.props.history.push({ pathname: '/auth' });
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push({ pathname: '/checkout' });
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            // ingredientAdded={this.addIngredientHandler}
            ingredientAdded={this.props.onIngredientAdded}
            // ingredientRemoved={this.removeIngredientHandler}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            // purchasable={this.state.purchasable}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            isLoggedin={this.props.isLoggedin}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgers.ingredients,
    totalPrice: state.burgers.totalPrice,
    error: state.burgers.error,
    isLoggedin: state.auth.isLoggedin,
    building: state.burgers.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))

    // onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    // onIngredientRemove: ingName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)));
