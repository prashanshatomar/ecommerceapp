import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  order = () => {
    axios
      .post(`http://localhost:3000/order`, { products: this.props.cart })
      .then((res) => {
        console.log("call api from frontend");
        console.log(res);

        alert("Order added success");
      })
      .catch((e) => {
        alert("Error while adding Order");
      });
  };

  render() {
    console.log("proppsss   == > ", this.props.cart);
    let { cart } = this.props;
    return (
      <div>
        <h1>Your cart : total : {cart?.length}</h1>
        <table>
          <thead>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {cart.map((val) => (
              <tr key={val._id}>
                <td>{val.name}</td>
                <td>{val.price}</td>
                <td>{val.discount}</td>
                <td>{val.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.order}>Order</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Cart);
