import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import imgUse from "./assets/img.png";

const style = {
  height: 220,
//   border: "1px solid green",
  margin: 6,
  padding: 8,
  display: 'flex'
};

class InfiniteScrol extends React.Component {
    imageList = () => {
       
            const img = require('./assets/img.png');
            const imgArr = [];
            for (let i = 0; i < 50; i++) {
                imgArr.push(img);
            }
            // console.log(imgArr);
            return imgArr
            
    
    }
  state = {
    items: Array.from({ length: 20 }),
    hasMore: true
  };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };

  render() {
    return (
      <div>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
        //   loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              <img src={imgUse} height="200" alt=""/>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default InfiniteScrol;