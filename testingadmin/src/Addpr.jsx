import React, { Component } from 'react';
class Addpr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prname: null,
            prcategory: null,
            prdesc: null,
            prprice: null,
            formErrors: {
                prname: "",
                prcategory: "",
                prdesc: "",
                prprice: "",
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
            case "prname":
                formErrors.prname =
                    value.length <= 0 ? "Field Required" : "";
                break;
            case "prcategory":
                formErrors.prcategory =
                    value === "selectcard" ? "Please Select A Valid Product Category" : "";
                break;
            case "prdesc":
                formErrors.prdesc =
                    value.length <= 0 ? "Field Required" : "";
                break;
            case "prprice":
                formErrors.prprice =
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
                    <h1>Add Product</h1>
                    <form onSubmit={this.handleSubmit} noValidate>

                        <div className="prname">
                            <label htmlFor="prname">Product Name</label>
                            <input
                                className={formErrors.prname.length > 0 ? "error" : null}
                                placeholder="Product Name"
                                type="text"
                                name="prname"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.prname.length > 0 && (
                                <span className="errorMessage">{formErrors.prname}</span>
                            )}
                        </div>
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
                        <div className="prdesc">
                            <label htmlFor="prdesc">Product Description</label>
                            <input
                                className={formErrors.prdesc.length > 0 ? "error" : null}
                                placeholder="Product Description"
                                type="text"
                                name="prdesc"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.prdesc.length > 0 && (
                                <span className="errorMessage">{formErrors.prdesc}</span>
                            )}
                        </div>
                        <div className="prprice">
                            <label htmlFor="prprice">Product Price</label>
                            <input
                                className={formErrors.prprice.length > 0 ? "error" : null}
                                placeholder="Product Price"
                                type="number"
                                name="prprice"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.prprice.length > 0 && (
                                <span className="errorMessage">{formErrors.prprice}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Addpr;
