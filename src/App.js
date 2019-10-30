import React, { Component } from "react";
import Layout from "./component/Layout/Layout";
import Burgerbuilder from "./container/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Burgerbuilder />
          <div></div>
        </Layout>
      </div>
    );
  }
}

export default App;
