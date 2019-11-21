import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Checkout extends Component {
  componentWillMount() {
    //console.log(this.props.ings);
  }
  CheckoutCanclledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchaseable = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseable}
          <CheckoutSummary
            onCheckoutCanclled={this.CheckoutCanclledHandler}
            onCheckoutContinue={this.CheckoutContinueHandler}
            ingredients={this.props.ings}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};
/* const mapDispatchToProps = dispatch => {
  return {
    
  };
};
 */
export default connect(mapStateToProps /*, mapDispatchToProps */)(Checkout);
