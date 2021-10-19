import "./App.css";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Main from "./components/chatBody/Main";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
export default App;
