import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";

import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

import Modal from "../../component/UI/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErorrHandler/withErorrHandler";

class BurgerBuilder extends Component {
  /* constructor(props) {
    super(props);
    this.state ={...}
  } */
  state = {
    purchasable: false,
    purchasing: false
  };
  componentDidMount() {
    // console.log(this.props.onFecthIngredients());
    this.props.onFecthIngredients();
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCloseHandler = () => {
    this.setState({ purchasing: false });
  };
  updatePurchaseState = newIngredients => {
    const sum = Object.keys(newIngredients)
      .map(igKey => {
        return newIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.err ? (
      <p>ingredient can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientremoved={this.props.onIngredientRemoved}
            /* ingredientAdded ingredientremoved */
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          close={this.purchaseCloseHandler}
          continue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCloseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    err: state.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onFecthIngredients: () => dispatch(burgerBuilderActions.fetchIngredients())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
