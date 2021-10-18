import React, { Component } from "react";
import Avatar from "../channels/Avatar";
import "./Header.css";
import logo from "./../../images/logo.png";
import user5 from "./../../images/user5.jpg";

export default class Header extends Component {
  render(){
    return(
      <div className="header">
        <div className="header_blocks">
          <img src={logo}></img>
        </div>
        <div className="header_blocks">
          <p>Leonardo Turtle</p>
        </div>
        <div className="header_blocks">
          <div className="user_avatar">
            <Avatar
              image={user5}
            />
          </div>
        </div>
      </div>
    );
  }

}
