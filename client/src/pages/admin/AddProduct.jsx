import React, { Component } from 'react';
import axios from 'axios';

class Addpr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prname: '',
            prcategory: '',
            prdesc: '',
            imageUrl: '',
            prprice: 0,
            formErrors: {
                prname: "",
                prcategory: "",
                prdesc: "",
                imageUrl: '',
                prprice: "",
            },
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const product = {
            title: this.state.prname,
            imageUrl: this.state.imageUrl,
            Price: this.state.prprice,
            Desc: this.state.prdesc,
            category: this.state.prcategory
        }

        await axios({
            method: 'post',
            url: 'http://localhost:4000/addProduct',
            data: product,
            'Content-Type': 'application/json'
        })
        console.log(product);
        this.setState({
            prname: '',
            prcategory: '',
            prdesc: '',
            prprice: ''
        });
        console.log(this.state);
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        // console.log(name, value);

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
            case "imageUrl":
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

        this.setState({ formErrors, [name]: value });
        // console.log(this.state);
    };

    render() {
        const { formErrors } = this.state;
        return (
            <div className="adwrapper" >
                <div className="form-wrapper">
                    <h1>Add Product</h1>
                    <form onSubmit={this.handleSubmit} noValidate>

                        <div className="prname">
                            <label htmlFor="prname">Product Name</label>
                            <input
                                className={formErrors.prname.length > 0 ? "error" : null}
                                placeholder="Product Name"
                                value={this.state.prname}
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
                                <option value="electronics">Electronics</option>
                                <option value="menswear">Men's Wear</option>
                                <option value="womenswear">Women's Wear</option>
                                <option value="books">Books</option>
                                <option value="shoes">Shoes</option>
                            </select>
                            {formErrors.prcategory.length > 0 && (
                                <span className="errorMessage">{formErrors.prcategory}</span>
                            )}
                        </div>
                        {/*  Need to be fixed later */}
                        <div className="prdesc">
                            <label htmlFor="imageUrl">Product Image</label>
                            <input
                                className={formErrors.imageUrl.length > 0 ? "error" : null}
                                placeholder="Product Image Url"
                                type="text"
                                value={this.state.imageUrl}
                                name="imageUrl"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.imageUrl.length > 0 && (
                                <span className="errorMessage">{formErrors.imageUrl}</span>
                            )}
                        </div>
                        <div className="prdesc">
                            <label htmlFor="prdesc">Product Description</label>
                            <input
                                className={formErrors.prdesc.length > 0 ? "error" : null}
                                placeholder="Product Description"
                                type="text"
                                value={this.state.prdesc}
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
                                value={this.state.prprice}
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
