import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onGetOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
        return <Order key={order.id} {...order} />;
      });
    }

    return <div>{orders}</div>;
  }
}

// export default withErrorHandler(Orders, axios);

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    error: state.orders.error,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: () => dispatch(actions.getOrdersStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
