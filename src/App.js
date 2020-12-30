import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ViewProducts from "./Components/ViewProducts";
import Cart from "./Components/Cart";
// import EditProduct from "./Components/EditProduct";
import AddProduct from "./Components/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ViewProducts} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/edit/:id" component={AddProduct} exact />
        <Route path="/add" component={AddProduct} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
