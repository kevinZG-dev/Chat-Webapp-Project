import React, { Component } from "react";
import "./Main.css";
import Channels from "../channels/Channels";
import Channel from "../channel/Channel";

export default class Main extends Component {
  render(){
    return(
      <div className="main_chatbody">
        <Channels />
        <Channel />
      </div>
    );
  }

}
