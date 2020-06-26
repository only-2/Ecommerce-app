import React, { Component } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';
import "./Profile.css"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Not Given",
            lastName: "Not Given",
            email: "Not Given",
            password: null,
            contact: null,
            dob: "Not Given",
            address: "Not Given",
        };
    }
    getProfile = async () => {
        const res = await axios.get(`http://localhost:4000/getProfile?id=${this.props.userinfo.userId}`);
        console.log(res.data)
        this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            password: res.data.password,
            contact: res.data.contact,
            dob: res.data.dob,
            address: res.data.address,
        });
        console.log(this.state)
    }
    componentWillMount() {
        this.getProfile();
    }

    handleDelete = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/deleteUser', {
            "userId": this.props.userinfo.userId
        });
        this.props.logout();
        console.log("User deleted", this.props.userinfo.userId);
    }

    render() {
        return (
            <div className="Home">
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />
                <div id="sc-edprofile">
                    <h1>{this.state.firstName} Profile</h1>
                    <div className="sc-container">
                        <input type="text" placeholder={"First Name: " + this.state.firstName} />
                        <input type="text" placeholder={"Last Name: " + this.state.lastName} />
                        <input type="text" placeholder={"Email: " + this.state.email} />
                        <input type="text" placeholder={"Contact: " + this.state.contact} />
                        <input type="text" placeholder={"Adddress: " + this.state.address} />
                        <input type="submit" value="Update" />
                        <br />
                        <input type="submit" value="Delete" onClick={this.handleDelete} />
                    </div>
                </div>
            </div >
        );
    }
}

export default Home;