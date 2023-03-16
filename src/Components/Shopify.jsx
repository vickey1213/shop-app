import React, { useState } from "react";
import Cards from "./Cards";
import { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setCategories } from "../Redux/Action";
import HashLoader from "react-spinners/HashLoader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CategoryCard from "./CategoryCard";
import { useRef } from "react";

const override = {
  display: "block",
  margin: "300px auto",
};
export default function Shopify() {
  let [flag, setFlag] = useState(false);
  let products = useSelector((state) => state);
  let dispatch = useDispatch();
  let data = products.allProducts.products;
  let searchText = products.allProducts.searchText.toLowerCase();
  let searchContent = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText)
  );
  let [slide, setSlide] = useState([]);

  useEffect(() => {
    setFlag(true);
    async function fetchData() {
      try {
        let products = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        dispatch(setProduct(products.data.products));
        setSlide(
          products.data.products.map((item) => {
            return item.thumbnail;
          })
        );
        setFlag(false);
      } catch (error) {
        console.log("error =>", error);
        setFlag(false);
        alert(JSON.stringify(error));
      }
    }
    fetchData();
  }, [dispatch]);

  useLayoutEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCategories(data));
      });
  }, [dispatch]);
  function intersection(x){
    let allDiv = Object.values(x);
    let observer = new IntersectionObserver(
      (item) => {
        item.forEach((div) => {
          if (div.isIntersecting) {
            div.target.style.transform = "translateY(0px) rotateY(0deg)";
          } else {
            div.target.style.transform = "translateY(300px) rotateY(90deg)";
          }
        });
      },
      {
        rootMargin: "200px",
        thresold: 0.2,
      }
    );
    allDiv.forEach((item) => {
      observer.observe(item);
    });
  }
  let allCard = useRef();

  setTimeout(() => {
    intersection(allCard.current.children) 
  }, 2000);

  return (
    <>
      {flag ? (
        <div className="mainBody">
          <HashLoader color="purple" cssOverride={override} size={50} />
        </div>
      ) : (
        <>
          {searchText ? (
            <div className="mainBody">
              <div className="products">
                <Cards data={searchContent} />
              </div>
            </div>
          ) : (
            <>
              <div className="mainBody">
                <Carousel
                  showStatus={false}
                  showThumbs={false}
                  autoPlay={true}
                  interval={3000}
                  useKeyboardArrows={true}
                  infiniteLoop={true}
                >
                  {slide.map((item, index) => {
                    return (
                      <img src={item} alt="" className="carousel" key={index} />
                    );
                  })}
                </Carousel>
              </div>
              <div className="mainBody">
                <div className="products">
                  <CategoryCard />
                </div>
                <div className="products" ref={allCard}>
                  <Cards data={data} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
