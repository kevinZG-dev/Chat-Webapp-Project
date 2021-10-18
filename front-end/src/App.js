import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/chatBody/Main";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="_app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
