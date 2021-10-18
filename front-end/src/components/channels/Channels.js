import React, { Component } from "react";
import "./Channels.css";
import ChannelsItems from "./ChannelsItems";

export default class Channels extends Component {
  allChatUsers = [
    {
      image: "../../images/user1.jpg",
      id: 1,
      name: "Maxime Attal",
      active: true,
      isOnline: true,
    },
    {
      image:
        "../../images/user2.jpg",
      id: 2,
      name: "Kevin Zheng",
      active: false,
      isOnline: false,
    },
    {
      image:
        "../../images/user3.jpg",
      id: 3,
      name: "Donatello Turtle",
      active: false,
      isOnline: false,
    },
    {
      image:
        "../../images/user4.jpg",
      id: 4,
      name: "Michelangelo Turtle",
      active: false,
      isOnline: true,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allChatUsers,
    };
  }

  render(){
    return (
      <div className="main_channels">
        <button className="button_add">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <div className="channels_heading">
          <h2>Chats</h2>
        </div>
        <div className="channels_search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="channels_items">
          {this.state.allChats.map((item, index) => {
            return (
              <ChannelsItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }

}
