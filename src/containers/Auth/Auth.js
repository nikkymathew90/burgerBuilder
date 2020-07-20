import React, { Component } from "react";
import Input from "./../../components/UI/Input/Input";
import Button from "./../../components/UI/Buttons/Buttons";
import classes from "./Auth.module.css";
import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "./../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementCongif: {
          type: "email",
          placeholder: "Your Email Address"
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
        elementCongif: {
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
    isFormValid: false,
    isSignup: false
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath != "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        value: event.target.value,
        touched: true,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        )
      }
    };

    let isFormValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      isFormValid = updatedAuthForm[inputIdentifier].valid && isFormValid;
    }

    console.log(isFormValid);
    //updatedAuthForm[inputIdentifier] = updatedFormElement;
    this.setState({ controls: updatedAuthForm, isFormValid: isFormValid });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  authModeHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  checkValidity(value, rule) {
    let isValid = true;
    if (rule.required) {
      isValid = value !== "" && isValid;
    }

    if (rule.minLength) {
      isValid = value.trim().length >= rule.minLength && isValid;
    }

    if (rule.maxLength) {
      isValid = value.trim().length <= rule.maxLength && isValid;
    }

    if (rule.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
      isValid = pattern.test(value) && isValid;
    }

    if (rule.isNumeric) {
      const pattern = /^\d+$/i;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElements.map(element => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementCongif}
        value={element.config.value}
        changed={event => this.inputChangeHandler(event, element.id)}
        inValid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = (
        <p className={classes.error}>
          Error: {this.props.error.split("_").join(" ")}
        </p>
      );
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="Success">SUBMIT</Button>
          <Button type="Danger" clicked={this.authModeHandler}>
            SWITCH TO {this.state.isSignup ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
