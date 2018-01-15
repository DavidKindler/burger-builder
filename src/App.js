import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <div className="App">
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/login" component={Auth} />
            <Route path="/" exact render={() => <BurgerBuilder />} />
          </div>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
