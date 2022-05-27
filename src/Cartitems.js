import React from 'react';
import { useStateValue } from './StateProvider';
import "./Cartitems.css";

function Cartitems(props) {
const[{basket},dispatch]=useStateValue(); 

const removeFromBasket=()=>{
    dispatch({
        type:"REMOVE_FROM_BASKET",
        id:props.id,
    })
}

  return <div className="cartItems">
<div className="cart_img">
<img src={props.image} alt=""/>
</div>

<div className="item_info">
    <h3>{props.title}</h3>
    <p className="product_price">
              <small>₹</small>
              <strong>{props.price}</strong>
          </p>
          <div className="product_rating">
              {Array(props.rating).fill().map((_,i)=>(
                <p>⭐️</p>
              ))
              }
              
              </div>
              
              
</div>
{!props.hiddenButton && (<button onClick={removeFromBasket}>Remove</button>)}


  </div>;
}

export default Cartitems;
