import React, { Component } from "react";
import Avatar from "../channels/Avatar";

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`message ${this.props.user ? this.props.user : ""}`}
      >
        <div className="message_content">
          <div className="channel_msg">{this.props.msg}</div>
          <div className="channel_meta">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
      </div>
    );
  }
}
