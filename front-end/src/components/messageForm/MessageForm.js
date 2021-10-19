import React from "react";
import "./MessageForm.css";
import Channel from "../channel/Channel";
const MessageForm = ({ addMessage }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    addMessage({
      content: data.get("content"),
      author: "Kevin",
      creation: Date.now(),
    });
    e.target.elements.content.value = "";
  };
  return (
    <form className="messageform" onSubmit={onSubmit}>
      <input
        type="input"
        name="content"
        className="content"
        placeholder="Type a message here"
      />
      <input type="submit" value="Send" className="sendNewMessage" />
    </form>
  );
};

export default MessageForm;
