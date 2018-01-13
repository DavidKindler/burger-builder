import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    this.props.onGetOrders();
  }

  render() {
    let orders = this.props.orders.map(order => {
      return <Order key={order.id} {...order} />;
    });
    return <div>{orders}</div>;
  }
}

// export default withErrorHandler(Orders, axios);

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    error: state.orders.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: () => dispatch(actions.getOrdersStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
