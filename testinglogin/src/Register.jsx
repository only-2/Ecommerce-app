import React, { Component } from "react";
import "./temporarycss/index12.css";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const dateRegex = RegExp(
  /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
);
const mobRegex = RegExp(
  /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
)
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      contact: null,
      dob: null,
      address: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contact: "",
        dob: "",
        address: "",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length <= 0 ? "Field Required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length <= 0 ? "Field Required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length <= 0 ? "Field Required" : "";
        break;
      case "contact":
        formErrors.email = mobRegex.test(value)
          ? ""
          : "Enter A Valid Phone Number";
        break;
      case "dob":
        formErrors.dob = dateRegex.test(value)
          ? ""
          : "Invalid Format Use As Given";
        break;
      case "address":
        formErrors.address =
          value.length <= 0 ? "Field Required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper" >
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
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
            <div className="contact">
              <label htmlFor="contact">contact</label>
              <input
                className={formErrors.contact.length > 0 ? "error" : null}
                placeholder="contact"
                type="number"
                name="contact"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.contact.length > 0 && (
                <span className="errorMessage">{formErrors.contact}</span>
              )}
            </div>
            <div className="dob">
              <label htmlFor="dob">Date Of Birth</label>
              <input
                className={formErrors.dob.length > 0 ? "error" : null}
                placeholder="dob (yyyy-mm-dd)"
                type="date"
                name="dob"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.dob.length > 0 && (
                <span className="errorMessage">{formErrors.dob}</span>
              )}
            </div>
            <div className="address">
              <label htmlFor="address">address</label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder="address"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
