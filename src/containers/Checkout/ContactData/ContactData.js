import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
        },
        // validation: {},
        valid: true,
        value: 'fastest'
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      orderDate: new Date(),
      userId: this.props.userId
    };

    console.log('order to be sent', order);
    this.props.onPurchaseBurger(order, this.props.token);
    this.props.onOrderSubmitted();
    this.props.history.push('/');
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input elementType={this.state.order} elementConfig={this.state.elementConfig} value={this.state.value} /> */}
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
// export default ContactData;
const mapStateToProps = state => {
  return {
    ingredients: state.burgers.ingredients,
    totalPrice: state.burgers.totalPrice,
    loading: state.burgers.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderSubmitted: () => dispatch(actions.initIngredients()),
    onPurchaseBurger: (order, token) => dispatch(actions.purchaseBurgerStart(order, token))
    // onOrderSubmitted: () => {
    //   // dispatch({ type: actionTypes.INITIAL_INGREDIENT });
    //   dispatch({ type: actionTypes.SET_INGREDIENTS });
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
