import React, { Component } from "react";
import Layout from "./component/Layout/Layout";
import Burgerbuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" Component={Checkout} />
            <Route path="/" exact Component={Burgerbuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
