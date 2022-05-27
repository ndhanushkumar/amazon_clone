import React from 'react';

import Cartitems from './Cartitems';
import "./CheckOut.css";
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function CheckOut() {
    
    const[{basket},dispatch]=useStateValue();
  return <div className="checkout">


       

        <div className="checkout_left">
        <img className="checkout_banner" src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/KD/banner_PC.jpg"
      alt="" />
      <h2 className="basket_title">
          Your Shopping Basket
      </h2>
      {basket.map((item)=>(
            <Cartitems id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price} />
      ))}
     
      </div>
      <div className="checkout_right">
     <Subtotal/>
    

        </div>
        


  </div>;
}

export default CheckOut;
