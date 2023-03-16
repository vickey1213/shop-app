import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../Redux/Action";

export default function CategoryCard() {
    let products = useSelector((state) => state);
    let category = products.allProducts.categories;
    let dispatch=useDispatch();

    function selectCategory(item){
        dispatch(setCategory(item));
    }
  return (
    <>
        {category.map((item,index)=>{
            return <Link
                to="/Category"
                key={index} className='categoryCard' onClick={()=>selectCategory(item)}
                style={{ textDecoration: "none", color: "black" }}
              >
                {item.toUpperCase().split('-').join(" ")}
              </Link>
                
            
        })}
    </>
  )
}


