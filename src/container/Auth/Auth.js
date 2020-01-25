import React, { Component } from "react";
import Input from "../../component/UI/Input/Input";
import Button from "../../component/UI/Button/Button";
import Spinner from "../../component/UI/Spinner/Spinner";
import classes from "./Auth.css";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
    console.log(this.props.loading);
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElem => (
      <Input
        key={formElem.id}
        elementType={formElem.config.elementType}
        elementConfig={formElem.config.elementConfig}
        value={formElem.config.value}
        shouldValidate={formElem.config.validation}
        invalid={!formElem.config.valid}
        touched={formElem.config.touched}
        changed={event => this.inputChangedHandler(event, formElem.id)}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errMessage = null;
    if (this.props.error) {
      errMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {errMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}{" "}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};
//videio 17 /310

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
