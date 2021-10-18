import React, { Component } from "react";
import "./Channels.css";
import ChannelsItems from "./ChannelsItems";
import user1 from "./../../images/user1.jpg";
import user2 from "./../../images/user2.jpg";
import user3 from "./../../images/user3.jpg";
import user4 from "./../../images/user4.jpg";

export default class Channels extends Component {
  allChatUsers = [
    {
      image: user1,
      id: 1,
      name: "Maxime Attal",
    },
    {
      image: user2,
      id: 2,
      name: "Kevin Zheng",
    },
    {
      image: user3,
      id: 3,
      name: "Donatello Turtle",
    },
    {
      image: user4,
      id: 4,
      name: "Michelangelo Turtle",
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
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }

}
