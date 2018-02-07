import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact render={() => <BurgerBuilder />} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isLoggedin) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact render={() => <BurgerBuilder />} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes} </Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedin: state.auth.isLoggedin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: authState => {
      dispatch(actions.authCheckState());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
