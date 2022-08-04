import React, { Component } from 'react';
import Navbar from './navbar';

class Header extends Component {
   
    
  state = {
    activeIndex: null,
    currentCity : localStorage.getItem('city'),
    currentCountry: localStorage.getItem('country'),
    currentAddress: localStorage.getItem('currentAddress')
  }
  handleClick = (index) => this.setState({ activeIndex: index });
  
  render() {
    const clickables = [
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: `${this.state.currentAddress}` },

    { name: `${this.state.currentCity + ',' + ' ' + this.state.currentCountry}` },
    { name: "Logout" }
  ];
  return (
    <div>
    <ul>
      { clickables.map((clickable, i) => {
          return <Navbar 
            key={ clickable.name }
            name={ clickable.name }
            index={ i }
            isActive={ this.state.activeIndex === i }
            onClick={ this.handleClick }
          />
        })
      }
  </ul>
</div>
  )
  }
}

export default Header;