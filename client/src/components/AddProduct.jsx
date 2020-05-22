import React from 'react';
import axios from 'axios';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageUrl: '',
      Price: 0,
      Desc: ''
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const product = {
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      Price: this.state.Price,
      Desc: this.state.Desc
    }

    // await axios.post('http://localhost:4000/addProduct', {
    //   title: this.state.title,
    //   imageUrl: this.state.imageUrl,
    //   Price: this.state.Price,
    //   Desc: this.state.Desc
    // })

    await axios({
      method: 'post',
      url: 'http://localhost:4000/addProduct',
      data: product,
      'Content-Type': 'application/json'
    })

    // fetch('http://localhost:4000/addProduct', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: product,
    // })
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error("Can't add Product!");
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData);
    //   })
    //   .catch(this.catchError);
    this.setState({ title: '' });
  }

  render() {
    return (
      <div style={{ maxWidth: '500px', alignContent: 'center', textAlign: 'center' }}>
        <form className="form-group" onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group wt">
            <label>Add Product</label>
            <input
              className="form-control"
              placeholder="Product Title"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })} />
            <input
              className="form-control"
              placeholder="Product Image"
              value={this.state.imageUrl}
              onChange={e => this.setState({ imageUrl: e.target.value })} />
            <input
              className="form-control"
              placeholder="Product Price"
              value={this.state.Price}
              onChange={e => this.setState({ Price: e.target.value })} />
            <input
              className="form-control"
              placeholder="Product Description"
              value={this.state.Desc}
              onChange={e => this.setState({ Desc: e.target.value })} />
          </div>
          <button onClick={this.onSubmit.bind(this)} className="btn btn-primary m-2">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
