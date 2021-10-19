import React from "react";
import { useState } from "react";
import "./Channel.css";
import MessageForm from "../messageForm/MessageForm";
import { DateTime } from "luxon";
const Channel = ({
  channel = {
    name: "Fake channel",
  },
}) => {
  const [messages, setMessages] = useState([
    {
      author: "Maxime",
      creation: 1602831101929,
      content: "Hi, my name is Maxime ! How are you doing today ?",
    },
    {
      author: "Kevin",
      creation: 1602832138892,
      content:
        "Hello Maxime, I'm Kevin, I'm fine but a little bit tired, and you ?",
    },
    {
      author: "Maxime",
      creation: 1602840139202,
      content: "I understand, we have a heavy course workload bro! ",
    },
    {
      author: "Kevin",
      creation: 1602844139200,
      content: "So, what are you up today ?",
    },
  ]);
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };
  return (
    <div className="channel">
      <div className="messages">
        <h1>Messages for {channel.name}</h1>
        <ul>
          {messages.map((message, i) => (
            <li key={i} className="message">
              <p>
                <span>{message.author}</span>{" "}
                <span>
                  {new DateTime(message.creation)
                    .toLocaleString(DateTime.DATETIME_MED)
                    .toString()}
                </span>
              </p>
              <div>
                {message.content
                  .split(/(\n +\n)/)
                  .filter((el) => el.trim())
                  .map((el) => (
                    <p>{el}</p>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <MessageForm addMessage={addMessage} />
    </div>
  );
};
export default Channel;
