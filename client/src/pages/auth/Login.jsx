import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import './Auth.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // // validate form errors being empty
  // Object.values(formErrors).forEach(val => {
  //   val.length > 0 && (valid = false);
  // });
  // // validate the form was filled out
  // Object.values(rest).forEach(val => {
  //   val === null && (valid = false);
  // });
  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--     
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      this.props.onLogin(e, {
        email: this.state.email,
        password: this.state.password
      })
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length <= 0 ? "Field Required" : "";
        break;

      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
    // console.log(this.state)
  };

  render() {

    const { formErrors } = this.state;

    return (
      <div className="wrapper" >
        <div className="form-wrapper">
          <h1 className="auth-h1">Login</h1>
          <form onSubmit={this.handleSubmit} >
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="createAccount">
              <button type="submit">Login</button>

              <NavLink exact to="/signup">
                <small>Don't Have an Account?</small>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
