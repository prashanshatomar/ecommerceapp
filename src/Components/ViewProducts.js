import React, { Component } from "react";
// import ReactTable from "react-table";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../store/action";

class ViewProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: "priducn11dddvffgdgdd",
          disocunt: "20",
          price: "1000",
        },
      ],

      columns: [
        {
          Name: "Name",
          accessor: "name",
        },
        {
          Price: "Price",
          accessor: "price",
        },
        {
          Discount: "Discount",
          accessor: "discount",
        },
      ],
      edit: false,
      cart: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    axios.get(`http://localhost:3000/`).then((res) => {
      console.log("call api from frontend", res);
      // console.log(res.data.payload);
      this.setState({
        data: res.data.payload,
      });
    });
  };
  sortData = (keyName, keyValue) => {
    axios
      .post(`http://localhost:3000/sort`, { keyName, keyValue })
      .then((res) => {
        console.log("call api from frontend");
        console.log(res.data.payload);
        this.setState({
          data: res.data.payload,
        });
      });
  };
  deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/${id}`)
      .then((res) => {
        console.log("delete ", res);
        alert("Delete success");
        this.getProducts();
      })
      .catch((e) => {
        alert("Delete error");
      });
  };

  addToCart = (val) => {
    let { cart } = this.state;
    var newCart = cart;
    // this.setState({
    //   cart: [...cart, { ...val, quantity: 1 }],
    // });
    let count = 0;

    cart.forEach((v) => {
      if (v._id === val._id) {
        count = count + 1;
      }
    });
    if (count > 0) {
      this.setState({ cart: [...cart, { ...val, quantity: count }] });
    } else {
      this.setState({ cart: [...cart, { ...val, quantity: 1 }] });
    }
    // console.log("new cart -- > ", newCart);
    this.props.addToCart({ ...val, quantity: 1 });
    // this.setState({ cart: newCart });
  };
  render() {
    let { data, cart } = this.state;
    console.log("car t data values --> ", this.state.cart);
    return (
      <div>
        <h1>View Product</h1>
        <Link to="/add">Add Product</Link> <br />
        <Link to="/cart">View Cart</Link>
        <table>
          <thead>
            <th>Product Name</th>
            <th>
              Price{" "}
              <button
                onClick={() => {
                  this.sortData("price", 1);
                }}
              >
                Sort asc
              </button>{" "}
              <button
                onClick={() => {
                  this.sortData("price", -1);
                }}
              >
                Sort asc
              </button>
            </th>
            <th>
              Discount
              <button
                onClick={() => {
                  this.sortData("discount", 1);
                }}
              >
                Sort asc
              </button>{" "}
              <button
                onClick={() => {
                  this.sortData("discount", -1);
                }}
              >
                Sort asc
              </button>
            </th>
          </thead>
          <tbody>
            {data?.length &&
              data.map((val, i) => (
                <tr key={i}>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>{val.discount}</td>
                  <td>
                    <button onClick={() => this.deleteProduct(val._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/edit/${val._id}`}>Update</Link>
                  </td>
                  <td>
                    <button onClick={() => this.addToCart(val)}>
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (data) => dispatch(addToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
