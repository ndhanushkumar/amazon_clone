import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { SearchContext } from "./Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"

import { IconButton } from "@mui/material";

function Header() {
  const [{ basket, user }] = useStateValue();
  const { search, setSearch } = useContext(SearchContext);
  const [ismobile, setIsMobile] = useState(false);
  const [show,setShow] = useState(false);
  const handleSignOut = () => {
    if (user) {
      auth.signOut();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      
      if (window.innerWidth < 768 && !ismobile) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo"
          src="https://www.bizmonthly.com/wp-content/uploads/2020/04/Amazon-logo-black-template.png"
          alt="amazon"
        />
      </Link>
      <div className="searchbar">
        <input
          type="text"
          className="search_input"
          placeholder="Search here..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
           
          }}
        />

        <div className="search_icon">
          <SearchIcon />
        </div>
      </div>

      <div className="header_nav">
        {ismobile && (
          <IconButton>
            <MenuIcon style={{ color: "white", fontSize: "30px" }} onClick={() =>setShow(!show)}/>
          </IconButton>
        )}{" "}
        <div className="header_nav hide">
          <Link to={!user && "/login"}>
            {" "}
            <div className="header_option">
              <span className="header_option_one">Hello {user?.email}</span>

              <span className="header_option_two" onClick={handleSignOut}>
                {user ? "Sign Out" : "Sign In "}
              </span>
            </div>
          </Link>
          <Link to="/orders">
            {" "}
            <div className="header_option">
              <span className="header_option_one">Returns</span>
              <span className="header_option_two">& Orders</span>
            </div>
          </Link>
          <div className="header_option">
            <span className="header_option_one">Your</span>
            <span className="header_option_two">Prime</span>
          </div>

          <Link to="/checkout">
            {" "}
            <div className="header_option_basket">
              <ShoppingCartIcon />
              <span className="basketcount">{basket?.length}</span>
            </div>
          </Link>
        </div>
    {show &&    <div className="menubar">
          <Link to={!user && "/login"}>
            {" "}
            <div className="header_option menu">
              <span className="header_option_one item">Hello {user?.email}</span>

              <span className="header_option_two item" onClick={handleSignOut}>
                {user ? "Sign Out" : "Sign In "}
              </span>
            </div>
          </Link>
          <Link to="/orders">
            {" "}
            <div className="header_option menu">
              <span className="header_option_one item">Returns</span>
              <span className="header_option_two item">& Orders</span>
            </div>
          </Link>
          <div className="header_option menu">
            <span className="header_option_one item">Your</span>
            <span className="header_option_two item">Prime</span>
          </div>

          <Link to="/checkout">
            {" "}
            <div className="header_option_basket menu">
              <ShoppingCartIcon onClick={()=>setShow(false)}/>
              <span className="basketcount">{basket?.length}</span>
            </div>
          </Link>
          <CloseIcon onClick={()=>setShow(false)}/>
        </div>}
      </div>
    </div>
  );
}

export default Header;
