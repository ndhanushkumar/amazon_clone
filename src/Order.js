import React from 'react';
import moment from "moment"
import Cartitems from './Cartitems';
import "./Order.css"
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';

function Order({order}) {
  return <div className="order">
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM Do YYYY , h:mma")}</p>
        <p className="order_id">{order.id}</p>
        {order.data.basket.map((item)=>(
          <Cartitems id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price} hiddenButton/>
        ))}
        <div className="order_price">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>
                      Order Total : <strong>{value}</strong>
                    </h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(order.data.basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
  </div>;
}

export default Order; 
