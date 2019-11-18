import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../component/Order/Order";
import withErorrHandler from "../../hoc/withErorrHandler/withErorrHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErorrHandler(Orders, axios);
