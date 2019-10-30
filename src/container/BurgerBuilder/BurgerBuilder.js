import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";

import Modal from "../../component/UI/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErorrHandler/withErorrHandler";
const INGREDIENT_PRICES = {
  salad: 200,
  bacon: 100,
  cheese: 100,
  meat: 100
};

class BurgerBuilder extends Component {
  /* constructor(props) {
    super(props);
    this.state ={...}
  } */
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("/ingredient.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseContinueHandler = () => {
    //alert("Continue");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Sam max",
        address: {
          street: "Teststreet 1",
          zipCode: "41351",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });
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

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredient = { ...this.state.ingredients };
    updateIngredient[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updateIngredient });
    this.updatePurchaseState(updateIngredient);
  };

  removeIngredientHandler = type => {
    //const oldCount = this.state.ingredients[type];
    const oldCount = this.state.ingredients[type];
    if (oldCount !== 0) {
      const reduceCount = oldCount - 1;
      const reduceIngredient = { ...this.state.ingredients };
      reduceIngredient[type] = reduceCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;

      this.setState({ totalPrice: newPrice, ingredients: reduceIngredient });
      this.updatePurchaseState(reduceIngredient);
    }
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>ingredient can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.addIngredientHandler}
            ingredientremoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          close={this.purchaseCloseHandler}
          continue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
export default withErrorHandler(BurgerBuilder, axios);
