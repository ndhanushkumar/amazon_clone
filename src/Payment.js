import React, { useEffect, useState } from "react";
import Cartitems from "./Cartitems";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

import axios from "./Axios";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";

function Payment() {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({paymentIntent}) => {
    
         setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }).catch((error)=>alert(error.message));

        setSucceeded(true);
        dispatch({
            type:"EMPTY_BASKET",
        })
        setError(null);
        setProcessing(false);
        navigate("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <h1>
        Checkout (<Link to="/checkout"> {basket?.length}items</Link>)
      </h1>
      <div className="payment_container">
        <div className="payment_section">
          <div className="payment_title">
            <h2>Delivery Address</h2>
          </div>
          <div className="payment_address">
            <p>{user.email}</p>
            <p>Vellore</p>
            <p>632202</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="checkout_items">
            {basket.map((item) => (
              <Cartitems
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h2>Payment</h2>
          </div>
          <div className="card_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="price_container">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>
                      Order Total : <strong>{value}</strong>
                    </h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
              <button disabled={processing || disabled || succeeded}>
                {" "}
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
