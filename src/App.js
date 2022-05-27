import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CheckOut from "./CheckOut";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise=loadStripe("pk_test_51KMjrTSFqA53jRBmi0NM6TShVHXodM53zY5vxtM85oWort6gDrsfE5Se4iVLKroWCEmEYPyqshp0Pp1lVrxLbyW900Hqer2PRN");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log("The User is>>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />

          <Route
            path="checkout"
            element={
              <div>
                <Header />
                <CheckOut />
              </div>
            }
          />
          <Route
            path="payment"
            element={
              <div>
                <Header />
                <Elements stripe={promise}>
                <Payment/></Elements>
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
<Route path="/orders" element={
  <>
  <Header/>
  <Orders/>
  </>
}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
