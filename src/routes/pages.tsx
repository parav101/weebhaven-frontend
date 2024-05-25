import { Route, Routes } from "react-router-dom";
import Home from "../screens/home";
import Layout from "../Layout/layout";
import About from "../screens/about";
import Shop from "../screens/shop";
import AccountInfo from "../screens/accountInfo";
import SignUp from "../screens/signup";
import Login from "../screens/login";
import Orders from "../screens/orders";
import Cart from "../screens/cart";
import Contact from "../screens/contact";
import ProductDetails from "../screens/singleProduct";
import AllOrders from "../screens/allorders";
import Address from "../screens/address";
import Checkout from "../screens/checkout";
import ManageProducts from "../screens/manageProducts";
import AddProduct from "../screens/addProduct";
import UpdateProdcut from "../screens/updateProduct";
import ProtectComponent from "./protectComponent";
import ManageOrders from "../screens/manageOrder";


function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout page={<Home />} />} />
        <Route path="/about" element={<Layout page={<About />} />} />
        <Route path="/shop" element={<Layout page={<Shop />} />} />
        <Route path="/shop/:product" element={<Layout page={<Shop />} />} />
        <Route path="/product/:name" element={<Layout page={<ProductDetails />} />} />
        <Route path="/product" element={<Layout page={<ProductDetails />} />} />
        <Route path="/account-info" element={<Layout page={<AccountInfo />} />} />
        <Route path="/account-address" element={<Layout page={<Address />} />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/currentOrder" element={<Layout page={<Orders/>} />} />
        <Route path="/all-orders" element={<Layout page={<AllOrders/>} />} />
        <Route path="/cart" element={<Layout page={<Cart/>} />} />
        <Route path="/contact" element={<Layout page={<Contact/>} />} />
        <Route path="/signup" element={<Layout page={<SignUp />} />} />
        <Route path="/login" element={<Layout page={<Login />} />} />
        <Route path="/manage-products" element={<ProtectComponent Component={<Layout page={<ManageProducts/>} />}/>} />
        <Route path="/add-product" element={<ProtectComponent Component={<Layout page={<AddProduct/>} />}/>} />
        <Route path="/update-product" element={<ProtectComponent Component={<Layout page={<UpdateProdcut/>} />}/>} />
        <Route path="/manage-orders" element={<ProtectComponent Component={<Layout page={<ManageOrders/>} />}/>} />
      </Routes>
    </>
  );
}

export default Pages;
