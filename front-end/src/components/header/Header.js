import React from "react";
import "./Header.css";
import logo from "../../images/logo_chat.png";

const Header = () => {
  return (
    <header className="App-header">
      <div className="header_blocks">
        <h1>Chat</h1>
      </div>
      <div className="header_blocks">
        <img src={logo}></img>
      </div>
      <div className="header_blocks"></div>
    </header>
  );
};
export default Header;
