import React, { Component, useState, createRef, useEffect } from "react";
import "./Channel.css";
import Avatar from "../channels/Avatar";
import Messages from "./Messages";


export default class Channel extends Component {
  messagesEndRef = createRef(null);
  chatMsg = [
    {
      key: 1,
      image:
        "../../images/user5.jpg",
      type: "",
      msg: "Hi, I'm Leonardo from Ninja Turtles.",
    },
    {
      key: 2,
      image:
        "../../images/user1.jpg",
      type: "other",
      msg: "Wesh, I'm Maxime I love your show !",
    },
    {
      key: 3,
      image:
        "../../images/user5.jpg",
      type: "",
      msg: "Hi, I'm Leonardo from Ninja Turtles.",
    },
    {
      key: 4,
      image:
        "../../images/user1.jpg",
      type: "other",
      msg: "Hi, I'm Leonardo from Ninja Turtles.",
    },
    {
      key: 5,
      image:
        "../../images/user5.jpg",
      type: "",
      msg: "Hi, I'm Leonardo from Ninja Turtles.",
    },
    {
      key: 6,
      image:
        "../../images/user1.jpg",
      type: "other",
      msg: "Hi, I'm Leonardo from Ninja Turtles.",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatMsg,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatMsg.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "../../images/user5.jpg",
          });
          this.setState({ chat: [...this.chatMsg] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    return (
      <div className="main_channel">
        <div className="content_header">
          <div className="blocks">
            <div className="current-channel-user">
              <Avatar
                isOnline="active"
                image="../../images/user1.jpg"
              />
              <p>Maxime Attal</p>
            </div>
          </div>
        </div>
        <div className="content_message">
          <div className="messages">
            {this.state.chat.map((itm, index) => {
              return (
                <Messages
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content_messageSend">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="buttonSendMsg" id="sendMsgButton">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

}
