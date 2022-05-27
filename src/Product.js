import React from 'react';
import "./Product.css";
import { useStateValue } from './StateProvider';
function Product(props) {
const[dispatch]=useStateValue();



const addToCart=()=>{

dispatch({
    type:"ADD_TO_BASKET",
    item:{
        id:props.id,
        title:props.title,
        price:props.price,
        image:props.image,
        rating:props.rating
    },
});

};



  return (<div className="product">
      <div className="product_info">
          <p>{props.title}</p>
          <p className="product_price">
              <small>₹</small>
              <strong>{props.price}</strong>
          </p>
          <div className="product_rating">
              {Array(props.rating).fill().map((_,i)=>(
                <p key={i}>⭐️</p>
              ))
              }
              
              </div>
          </div>
               <img src={props.image} alt=""/>
         
          <button onClick={addToCart}>Add to Cart</button>
      
  </div>);
}

export default Product;
