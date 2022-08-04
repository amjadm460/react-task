import React from "react";
import Header from "./header";
import InfiniteScroll from "./infinitescroll";

function  Home() {
    // const img = require('./assets/img.png');
   

   return (
    <div>
         
            <Header />
            <div className="container">
                <InfiniteScroll />
            </div>
    </div>
  
   )
};

export default Home;
