import React, { useContext } from "react";
import "./Home.css";
import Product from "./Product";
import { data } from "./Data";
import { SearchContext } from "./Search";
function Home() {
  const { search } = useContext(SearchContext);
  return (
    <div className="home">
      <div className="home_container">
        <img
          src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"
          alt=""
          className="home_image"
        />
      </div>
      <div className="home_row">
        {data
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )

          .map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
      </div>
      {/*   <Product
          id="49538094"
          title="ASUS ROG Strix G15 (2021) Gaming Laptop, 15.6” 300Hz IPS Type FHD Display, NVIDIA GeForce RTX 3070, AMD Ryzen R9-5900HX, 32GB DDR4, 1TB PCIe SSD, Per-Key RGB Keyboard, Windows 10, G513QR-AS98"
          price={159000}
          rating={4}
          image="https://m.media-amazon.com/images/I/811QpiYXe-L._AC_SX355_.jpg"
        />
      </div>
      <div className="home_row">
        <Product id="445p8094"
          title="APPLE iPhone 13 (Blue, 128 GB)|15.49 cm (6.1 inch) Super Retina XDR Display"
          price={79900}
          rating={4}
          image="https://rukminim1.flixcart.com/image/832/832/ktketu80/mobile/s/n/i/iphone-13-mlpk3hn-a-apple-original-imag6vpyrhqjgqzw.jpeg?q=70"/>
        <Product id="4453f94"
          title="APPLE MacBook Air M1 - (16 GB/512 GB SSD/Mac OS Big Sur) Z124J004KD  (13.3 inch, Silver, 1.29 Kg)"
          price={112000}
          rating={4}
          image="https://rukminim1.flixcart.com/image/832/832/kyt0ya80/computer/i/d/p/na-thin-and-light-laptop-apple-original-imagaygvtvf6cx8h.jpeg?q=70"/>
        <Product id="r453f94"
          title="Cosmic Byte Stardust Wired Gaming Headset  (Red, On the Ear)"
          price={2999}
          rating={4}
          image="https://rukminim1.flixcart.com/image/832/832/keaaavk0-0/headphone/m/e/m/stardust-cosmic-byte-original-imafvy2pft2sndhv.jpeg?q=70"/>
       
      </div>
      <div className="home_row">
        <Product id="453rgedfb"
        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
        price={199999}
        rating={5}
        image="https://m.media-amazon.com/images/I/81rus0UFhsL._AC_SX450_.jpg"/></div> */}
    </div>
  );
}

export default Home;
