import React, { Component } from "react";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      chesse: 1,
      bacon: 1
    }
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}
export default Checkout;