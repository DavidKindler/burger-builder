import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import axios from '../../axios-orders';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignup: true
  };

  componentDidMount() {
    // if (!this.props.building && this.props.authRedirectPath !== '/') {
    //   this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
    // }
    // this.props.onSetAuthRedirectPath('/');
    if (!this.props.building) {
      this.props.onSetAuthRedirectPath('/');
    } else {
      this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
    }
  }
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
    if (rules.isEmail) {
      const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  formHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.controls) {
      formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
    }
    // console.log(formData);
    this.props.onLoginSubmitted({ ...formData, isSignup: this.state.isSignup });
  };
  switchAuthModeHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginForm = { ...this.state.controls };
    const updatedFormElement = { ...updatedLoginForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedLoginForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedLoginForm, formIsValid: formIsValid });
  };

  render() {
    let authRedirect = null;
    if (this.props.isLoggedin) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = (
      // <form onSubmit={this.formHandler}>
      <form>
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

        <Button btnType="Success" clicked={this.formHandler} disabled={!this.state.formIsValid}>
          SUBMIT
        </Button>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.AuthData}>
        {authRedirect}
        {errorMessage}
        <h4>{this.state.isSignup ? 'Signup' : 'Login'} Form</h4>
        {form}
      </div>
    );
  }
}

// export default Auth;

const mapStateToProps = state => {
  return {
    isLoggedin: state.auth.isLoggedin,
    loading: state.auth.loading,
    error: state.auth.error,
    building: state.burgers.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmitted: formData => dispatch(actions.auth(formData)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
