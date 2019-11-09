import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        totalPrice = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, price: totalPrice });
  }
  CheckoutCanclledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutCanclled={this.CheckoutCanclledHandler}
          onCheckoutContinue={this.CheckoutContinueHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
