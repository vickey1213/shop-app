import React from "react";
import { useState } from "react";
import { BsStarHalf } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../Redux/Action";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {
  let data = props.data;
  let stock = ``;
  let products = useSelector((state) => state);
  let cartProducts = products.allProducts.product;
  let [cart, setCart] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const date = new Date();
  let todayDate = date.getDate();
  let month = date.getMonth() + 1;
  let deliveryDate = todayDate;
  let deliveryMonth = deliveryTiming(month);
  let fastDeliveryDate = todayDate;
  let fastDeliveryMonth = deliveryTiming(month);

  if (month === 12 && todayDate > 25) {
    deliveryDate = 2;
    deliveryMonth = "Jan";
    fastDeliveryDate = 1;
    fastDeliveryMonth = "Jan";
  } else if (todayDate > 25) {
    deliveryDate = 2;
    deliveryMonth = deliveryTiming(month + 1);
    fastDeliveryDate = 1;
    fastDeliveryMonth = deliveryTiming(month + 1);
  } else if (todayDate > 19 && todayDate < 25) {
    deliveryDate = deliveryDate + 3;
    if (deliveryDate <= 31) {
      fastDeliveryDate = deliveryDate - 2;
    }
  } else {
    deliveryDate =
      deliveryDate +
      3 +
      Math.ceil(Number(String(Math.random() * 10).slice(0, 1)));
    fastDeliveryDate = fastDeliveryDate + 2;
  }

  function deliveryTiming(month) {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        break;
    }
  }
  function sendData(ind) {
    let val = data.filter((item, index) => index === ind);
    cart.push(...val);

    if (cartProducts.length === 0) {
      cart[0].count = 1;
      cart[0].DeliveryDate = deliveryDate;
      cart[0].DeliveryMonth = deliveryMonth;
      cart[0].FastDeliveryDate = fastDeliveryDate;
      cart[0].FastDeliveryMonth = fastDeliveryMonth;
      dispatch(selectProduct(cart));
      sessionStorage.setItem("cart", JSON.stringify([...cart]));
    } else {
      let value = cartProducts.filter((item) => item.id === cart[0].id);
      let remainedValue = cartProducts.filter((item) => item.id !== cart[0].id);

      if (value.length) {
        if (value[0].count < 10) {
          value[0].count += 1;
          dispatch(selectProduct([...value, ...remainedValue]));
          sessionStorage.setItem(
            "cart",
            JSON.stringify([...value, ...remainedValue])
          );
        }
      } else {
        cart[0].count = 1;
        cart[0].DeliveryDate = deliveryDate;
        cart[0].DeliveryMonth = deliveryMonth;
        cart[0].FastDeliveryDate = fastDeliveryDate;
        cart[0].FastDeliveryMonth = fastDeliveryMonth;
        dispatch(selectProduct([...cart, ...cartProducts]));
        sessionStorage.setItem(
          "cart",
          JSON.stringify([...cart, ...cartProducts])
        );
      }
    }
    setCart([]);
    setTimeout(() => navigate("/Cart"), 300);
  }
  

  return data.map((data, index) => {
    return (
      <div className="card" key={index}>
        <div>
          <div
            className="cardImg"
            style={{ backgroundImage: `url(${data.thumbnail})` }}
          ></div>
          <div className="cardRating">
            <div className="rating">
              <b>{data.rating}</b>
            </div>
            <div className="star">
              <BsStarHalf />
            </div>
          </div>
        </div>

        <div className="cardDetails">
          <div className="cardName">
            {data.brand} | {data.title}
          </div>

          <div className="cardPriceCategory">
            <div className="cardCategoryStock">
              <div className="cardCategory">{data.category}</div>
              <div className="cardStock">
                {data.stock > 50
                  ? (stock = "cardStockGreen")
                  : (stock = "cardStockRed")}
              </div>
              <div className={stock}>
                {data.stock > 50 ? "In Stock" : `Only few left`}
              </div>
            </div>

            <div className="cardPrice">
              <span className="dollar">Rs.</span>
              <span className="price">
                {Math.ceil(data.price * 81).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="cardAdd">
            <button className="btnHeart">
              <FaHeart size={25} />
            </button>
            <button className="btnCart" onClick={() => sendData(index)}>
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default Cards;
