import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      price: null,
      discount: null,
      id: null,
    };
  }
  componentDidMount() {
    console.log("pathname=hjj===");
    console.log(window.location.pathname);
    let pathn = window.location.pathname.split("/");
    console.log(pathn[2]);
    let id = pathn[2];
    if (pathn[1] === "edit") {
      axios
        .post(`http://localhost:3000/product/${id}`)
        .then((res) => {
          console.log("call api from frontend");
          console.log(res.data);
          let { name, price, discount, _id } = res.data;
          this.setState({
            name,
            price,
            discount,
            id: _id,
          });
        })
        .catch((e) => {
          console.log("error  ", e);
        });
    }
  }
  reset = () => {
    this.setState({
      name: null,
      price: null,
      discount: null,
    });
  };
  add = () => {
    let { name, price, discount } = this.state;
    axios
      .post(`http://localhost:3000`, { name, price, discount })
      .then((res) => {
        console.log("call api from frontend");
        console.log(res);

        alert("Product added success");
      })
      .catch((e) => {
        alert("Error while adding product");
      });
  };
  update = () => {
    let { name, price, discount } = this.state;

    axios
      .patch(`http://localhost:3000/${this.state.id}`, {
        name,
        price,
        discount,
      })
      .then((res) => {
        console.log("call api from frontend");
        console.log(res);

        alert("Product update success");
      })
      .catch((e) => {
        alert("Error while adding product");
      });
  };
  render() {
    let { name, price, discount } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Add Product</h1>
        <Link to="/">View All products</Link>
        <br />
        Name{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <br />
        Price{" "}
        <input
          type="text"
          value={price}
          onChange={(e) => this.setState({ price: e.target.value })}
        />
        <br />
        Discount{" "}
        <input
          type="text"
          value={discount}
          onChange={(e) => this.setState({ discount: e.target.value })}
        />
        <br />
        {window.location.pathname === "/add" ? (
          <button onClick={this.add}>Add</button>
        ) : (
          <button onClick={this.update}>Update</button>
        )}
      </div>
    );
  }
}
