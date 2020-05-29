import React, { Component } from 'react';
class Deleteproduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            prcategory: null,
            formErrors: {
                prcategory: "",
            },
        };
    }

    handleSubmit = e => {
        e.preventDefault();
    };
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "prcategory":
                formErrors.prcategory =
                    value === "selectcard" ? "Please Select A Valid Product Category" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
        console.log(this.state);
    };


    render() {
        const { formErrors } = this.state;
        return (
            <div className="wrapper" >
                <div className="form-wrapper">
                    <h1>Delete Products</h1>
                    <form onSubmit={this.handleSubmit} noValidate>


                        <div className="prcategory">
                            <label htmlFor="prcategory">Product Category</label>
                            <select
                                noValidate
                                name="prcategory"
                                onChange={this.handleChange}
                            >

                                <option value="selectcard">Product Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Men's Wear">Men's Wear</option>
                                <option value="Women's Wear">Women's Wear</option>
                                <option value="Kids Wear">Kids Wear</option>
                                <option value="Toys Section">Toys Section</option>
                            </select>
                            {formErrors.prcategory.length > 0 && (
                                <span className="errorMessage">{formErrors.prcategory}</span>
                            )}
                        </div>

                        <div className="createAccount">
                            <button type="submit">Delete</button>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Deleteproduct;