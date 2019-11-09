import React, { Component } from "react";
import Layout from "./component/Layout/Layout";
import Burgerbuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";

import Orders from "./container/Orders/Orders";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={Burgerbuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
