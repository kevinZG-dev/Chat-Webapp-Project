import React from "react";

import "./Main.css";
import Channels from "../channels/Channels";
import Channel from "../channel/Channel";

export default () => {
  return (
    <main className="App-main">
      <Channels />
      <Channel />
    </main>
  );
};
