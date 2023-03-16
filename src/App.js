import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shopify from "./Components/Shopify";
import { Header } from "./Components/Header";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PhoneLogin from "./Components/PhoneLogin";
import Profile from "./Components/Profile";
import Authorization from "./Firebase/Authorization";
import Category from "./Components/Category";
import Wishlist from "./Components/Wishlist";
import Address from "./Components/Address";
import Orders from "./Components/Orders";
import Dilivery from "./Components/Dilivery";

function App() {
  return (
    <>
      <Router>
      <Authorization>
        <Header/>
        <Routes>
          <Route path="/" element={<Shopify/>}></Route>
          <Route path="/Cart" element={<Cart/>}></Route>
          <Route path="/Category" element={<Category/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Address" element={<Address/>}></Route>
          <Route path="/Wishlist" element={<Wishlist/>}></Route>
          <Route path="/Orders" element={<Orders/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/PhoneLogin" element={<PhoneLogin/>}></Route>
          <Route path="/Signup" element={<Signup/>}></Route>
          <Route path="/Dilivery" element={<Dilivery/>}></Route>
        </Routes>
        </Authorization>
      </Router>
    </>
  );
}

export default App;
