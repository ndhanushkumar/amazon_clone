import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useNavigate } from "react-router";
import "./LoginPage.css";
function LoginPage() {
    const history=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const signIn= e =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .then((userAccount)=>
    {console.log(userAccount.user)
        history('/');
    })
    
    .catch((error)=>alert(error))
}

  return (
    <div className="login_page">
      <Link to="/">
        <div className="login_logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
            alt=""
          />
        </div>
      </Link>{" "}
      <form className="login_form">
        <h1>Sign In</h1>
        <label className="login_label">Email</label>
        <input
          type="text"
          className="login_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login_label">Password</label>
        <input
          type="password"
          className="login_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
       
        <button className="signup_button" type="submit" onClick={signIn}> Sign In</button>
        <p className="TandC">
          By signing -in you agree to Amazon's Conditions of Use and Sale.Please
          see our Privacy Notice, our Cookie Notice and our internet-Based Ads
          Notice
        </p>
        <Link to="/signup">
          {" "}
          <button className="signup_button">Create New Amazon account</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
