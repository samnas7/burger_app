import React, { Component } from "react";
import Layout from "./component/Layout/Layout";
import Burgerbuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Burgerbuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
