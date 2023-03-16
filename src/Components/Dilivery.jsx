import React from "react";
import { useSelector } from "react-redux";

const Dilivery = () => {
  let product = useSelector((state) => state);
  let data = product.allProducts.product;
  let fast = product.allProducts.fastDelivery;

  return (
    <div className="cartBody">
      <div className="cartProducts">
        {data?.map((data, index) => {
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
              </div>
              <div className="cartDelivery">
                <div className="cartDeliveryTiming">
                  <div className="cartDeliveryDate">
                    Delivery by{" "}
                    {fast ? data.FastDeliveryMonth : data.DeliveryMonth}{" "}
                    {fast ? data.FastDeliveryDate : data.DeliveryDate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dilivery;
