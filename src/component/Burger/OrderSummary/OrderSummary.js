import React from "react";

import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

import Button from "../../UI/Button/Button";
const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igkey => {
    return (
      <li key={igkey}>
        {" "}
        <span style={{ textTransform: "capitalize" }}> {igkey}</span>{" "}
        {props.ingredients[igkey]}{" "}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A Delecious Burger with the Ingredients below</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.close}>
        Cancel{" "}
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        Continue{" "}
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;
//could be a class
