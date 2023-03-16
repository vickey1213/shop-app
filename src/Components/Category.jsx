import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";

export default function Category() {
  let products = useSelector((state) => state);
  let searchCategoryProduct = products.allProducts.setCategory;
  let [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchCategory() {
      let data = await fetch(
        `https://dummyjson.com/products/category/${searchCategoryProduct}`
      ).then((res) => res.json());
      console.log(data.products);
      setCategory(data.products);
    }
    fetchCategory();
  }, [searchCategoryProduct]);
  return (
    <div className="mainBody">
      <div className="categoryName">
        <h2>{searchCategoryProduct.toUpperCase().split("-").join(" ")}</h2>
      </div>
      <div className="categoryProducts">
        <Cards data={category} />
      </div>
    </div>
  );
}
