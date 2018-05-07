import React, { Component } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Main from "./main";
import "./App.css";

class App extends Component {
  state = {
    response: ""
  };

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:8080");
    socket.on("FromAPI", data => {
      if (data.find(x => x.username === sessionStorage.getItem("username"))) {
        alert("unusual activity happen");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/alerts">Alerts</Link>
              </li>
              <li>
                <Link to="/sequences">Sequences</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
