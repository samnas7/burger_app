import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../component/Order/Order";
import withErorrHandler from "../../hoc/withErorrHandler/withErorrHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../component/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErorrHandler(Orders, axios));
