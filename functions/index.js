const functions = require("firebase-functions");
const express =require("express");
const cors=require("cors");

const stripe =require("stripe")
('sk_test_51KMjrTSFqA53jRBmVk44W6ilZVyUTk7ReuXZr8J4DpeVoNpWztWTjM98OQUMFuiyt35sasyVfkEE5uUw01sRLpdH00gLyOpoml')
 

const app=express();

app.use(cors({origin:true}));
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).send('hello world')

})

app.post("/payments/create",async (req,res)=>{

    const total = req.query.total;
    console.log(total);
    const paymentIntent= await stripe.paymentIntents.create({
        amount:total,
        currency:"inr"
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret, 
    })
})

exports.api=functions.https.onRequest(app);