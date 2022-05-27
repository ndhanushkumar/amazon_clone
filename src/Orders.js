import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Order from './Order';
import { useStateValue } from './StateProvider';
import "./Order.css";

function Orders() {
    const[orders,setOrders]=useState([]);
    const[{basket,user}]=useStateValue();
useEffect(()=>{

const getOrders=()=>{


    
    const ordersRef=collection(db,"users",user?.uid,"orders");
    const q=query(ordersRef,orderBy("created","desc"));
   
    getDocs(q).then((orderSnapShot)=>{ setOrders(
        orderSnapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );})
   
}
if(user){
getOrders();
console.log(orders);
}else{
    setOrders([]);
}
},[user])


  return <div className="orders">
     <h1>Your Orders</h1>
     <div className="orderslist">
     {orders.map((order)=>(
<Order order={order}/>
       )
        )}
         </div> 
    
  </div>;
}

export default Orders ;
