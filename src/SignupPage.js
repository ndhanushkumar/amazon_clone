import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword} from "@firebase/auth";
import {useNavigate} from "react-router";
function SignupPage() {
    const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   useEffect(()=>{
//     onAuthStateChanged(auth,(authUser)=>{
    
//      if(authUser)
//  {      updateProfile(auth.currentUser,{
//          displayName:"Dhanush",
//        })
//     }})
      
//   },[])
  const signUp=e=>{
      e.preventDefault();
      createUserWithEmailAndPassword(auth,email,password)
      .then((userAccount)=>{
          console.log(userAccount.user);
          navigate("/")
  })
 

  .catch((error)=>alert(error));
  updateProfile();
}

const updateProfile=()=>{
  updateProfile(auth.currentUser, {
    displayName: {name}
  }).then(()=>console.log(`updated${name}`))
}
  return (
    <div className="signup_page">
      <Link to="/">
        <div className="login_logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
            alt=""
          />
        </div>
      </Link>{" "}
      <form className="login_form">
        <h1>Sign Up</h1>
        <label className="login_label">Name</label>
        <input
          type="text"
          className="login_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
      <button className="signup_button" type="submit" onClick={signUp}> Sign Up</button>
        <p className="TandC">
          By signing -in you agree to Amazon's Conditions of Use and Sale.Please
          see our Privacy Notice, our Cookie Notice and our internet-Based Ads
          Notice
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
