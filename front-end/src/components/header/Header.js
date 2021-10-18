import React, { Component } from "react";
import "./Header.css";
import logo from "./../../images/logo.png";

export default class Header extends Component {
  render(){
    return(
      <div className="header">
        <div className="header_blocks">
          <img src={logo}></img>
        </div>
        <div className="header_blocks"></div>
        <div className="header_blocks"></div>
      </div>
    );
  }

}
