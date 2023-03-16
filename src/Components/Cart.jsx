import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "../Redux/Action";
import { fastDeliveryy } from "../Redux/Action";
import fastImg from "../Assets/Fastdelivery.png";
import empty from "../Assets/EmptyCart.png";
import { useNavigate } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Cart() {
  let product = useSelector((state) => state);
  let dispatch = useDispatch();
  let data = product.allProducts.product;
  let fast = product.allProducts.fastDelivery;
  let navigate = useNavigate();
  let [count, setCount] = useState(false);
  let [remove, setRemove] = useState(false);
  let price = data.map((item) => {
    return Math.ceil(item.price * 81) * item.count;
  });
  let sumPrice = 0;
  for (let i = 0; i < price.length; i++) {
    sumPrice += price[i];
  }
  function incCount(ind) {
    let value = data.filter((item, index) => index === ind);
    if (value[0].count < 10) {
      value[0].count += 1;
    } else {
      setCount(true);
      setTimeout(() => {
        setCount(false);
      }, 3000);
    }

    data.splice(ind, 1, ...value);
    dispatch(selectProduct([...data]));
  }
  function decCount(ind) {
    let value = data.filter((_, index) => index === ind);
    let remainValue = data.filter((_, index) => index !== ind);
    if (value[0].count > 1) {
      value[0].count -= 1;
      data.splice(ind, 1, ...value);
      dispatch(selectProduct([...data]));
    } else {
      dispatch(selectProduct([...remainValue]));
    }
  }

  function inpCount(e, ind) {
    console.log(e.target.value);
    if (e.target.value > 10) {
      data[ind].count = 10;
      setCount(true);
      setTimeout(() => {
        setCount(false);
      }, 3000);
    } else {
      data[ind].count = e.target.value;
    }
  }
  function removeItem(ind) {
    data.splice(ind, 1);
    dispatch(selectProduct(data));
    setRemove(true);
    setTimeout(() => {
      setRemove(false);
    }, 2000);
  }
  function fastdelivery() {
    dispatch(fastDeliveryy(!fast));
  }

  return (
    <div className="cartBody">
      {data.length ? (
        <div className="cartProducts">
          {data.map((data, index) => {
            return (
              <div className="cartCard" key={index}>
                <div className="cartCardImg">
                  <img src={data.thumbnail} alt="" className="cartCardPic" />
                </div>

                <div className="cartCardDetails">
                  <div className="cartNamePrice">
                    <div className="cartCardName">{data.title}</div>

                    <div className="cartCardPriceCategory">
                      <div className="cartCardPrice">
                        <span className="dollar">Rs.</span>
                        <span className="cartPrice">
                          {(
                            Math.ceil(data.price * 81) * data.count
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="cartBtn">
                    <button
                      className="cartDecBtn"
                      onClick={() => decCount(index)}
                    >
                      <b>-</b>
                    </button>
                    <input
                      type="text"
                      className="cartCount"
                      value={data.count}
                      onChange={(e) => {
                        inpCount(e, index);
                      }}
                    />
                    <button
                      className="cartIncBtn"
                      onClick={() => incCount(index)}
                    >
                      <b>+</b>
                    </button>
                    <button
                      className="cartRemoveBtn"
                      onClick={() => removeItem(index)}
                    >
                      REMOVE
                      <ImBin />
                    </button>
                  </div>
                </div>
                <div className="cartDelivery">
                  <div className="cartDeliveryTiming">
                    <div className="cartDeliveryDate">
                      Delivery by{" "}
                      {fast ? data.FastDeliveryMonth : data.DeliveryMonth}{" "}
                      {fast ? data.FastDeliveryDate : data.DeliveryDate}
                    </div>
                    {/* <div className="cartDeliveryChooseTime">
                      Choose Your Delivery Slot
                    </div>
                    <select name="" id="" className="cartDeliveryTime">
                      <option value="">06:00 AM - 08:00 AM</option>
                      <option value="">08:00 AM - 10:00 AM</option>
                      <option value="">10:00 AM - 12:00 PM</option>
                      <option value="">12:00 PM - 02:00 PM</option>
                      <option value="">02:00 PM - 04:00 PM</option>
                      <option value="">04:00 PM - 06:00 PM</option>
                      <option value="">06:00 PM - 08:00 PM</option>
                    </select> */}
                  </div>
                </div>
              </div>
            );
          })}
          {count ? (
            <div className="cartOrder">
              <h1
                style={{
                  color: "red",
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "25px",
                }}
              >
                More than 10 items not allowed
              </h1>
            </div>
          ) : remove ? (
            <div className="cartOrder">
              <h1
                style={{
                  color: "green",
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "25px",
                }}
              >
                Successfully removed
              </h1>
            </div>
          ) : (
            <div className="cartOrder">
              <Link to="/Dilivery" style={{ fontSize: "30px", color: "red" }}>
                Place Order
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="cartEmpty">
          <div className="cartEmptyImage">
            <img src={empty} alt="empty" className="emptyImage" />
          </div>
          <div className="cartEmptyTitle">
            Your cart is empty! Add items to it now.
          </div>
          <div className="cartEmptyBtn">
            <button className="cartEmptyShopBtn" onClick={() => navigate("/")}>
              Shop Now
            </button>
          </div>
        </div>
      )}
      {data.length ? (
        <div className="cartPriceSection">
          <h4 className="cartPriceSectionTitle">PRICE DETAILS</h4>
          <div className="cartAmount">
            <div className="cartItems">
              <div>Price ({data.length} items)</div>
              <div>{sumPrice.toLocaleString()}</div>
            </div>
            {sumPrice ? (
              <div className="cartDeliveryCharges">
                <div>Delivery Charges</div>
                <div
                  className={
                    sumPrice < 1000
                      ? fast
                        ? "cartDeliveryChargesRed"
                        : "cartDeliveryChargesGreen"
                      : fast
                      ? "cartDeliveryChargesRed"
                      : "cartDeliveryChargesGreen"
                  }
                >
                  {fast
                    ? Math.ceil(sumPrice / 75) > 100
                      ? Math.ceil(sumPrice / 75).toLocaleString()
                      : 100
                    : sumPrice < 1000
                    ? 50
                    : "Free"}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="cartTotalAmount">
            <div>
              <b>Total Amount</b>
            </div>
            <div>
              <b>
                {fast
                  ? Math.ceil(sumPrice / 75) > 100
                    ? (Math.ceil(sumPrice / 75) + sumPrice).toLocaleString()
                    : (sumPrice + 100).toLocaleString()
                  : sumPrice < 1000
                  ? (sumPrice + 50).toLocaleString()
                  : sumPrice.toLocaleString()}
              </b>
            </div>
          </div>

          <div className="cartSavings">
            You will save ₹{Math.ceil(sumPrice / 11.5).toLocaleString()} on this
            order
          </div>

          <div className="cartFastDelivery">
            <div className="cartFastDeliveryImage">
              <img src={fastImg} alt="imgggg" className="fastDeliveryimg" />
            </div>
            <div className="cartFastDeliveryText">
              <input
                id="fastOption"
                type="checkbox"
                className="cartCheckbox"
                onChange={fastdelivery}
                checked={fast}
              />
              <label htmlFor="fastOption">Opting for Fast Delivery</label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
