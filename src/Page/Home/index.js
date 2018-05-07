import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      submitedUser: "",
      row: Array.from(Array(8).keys()),
      column: Array.from(Array(8).keys())
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.tileClick = this.tileClick.bind(this);
  }

  componentDidMount = () => {
    const submitedUser = sessionStorage.getItem("username");
    if (submitedUser) {
      this.setState({ submitedUser });
    }
  };

  onChangeUsername = function(e) {
    this.setState({ username: e.target.value });
  };

  submitForm(e) {
    e.preventDefault();
    this.addUser({ username: this.state.username })
      .then(res => {
        sessionStorage.setItem("username", res.data.username);
        this.setState({ submitedUser: res.data.username });
      })
      .catch(err => console.log(err));
  }

  addUser = async data => {
    try {
      const response = await fetch("http://localhost:8080/api/addUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    } catch (err) {
      console.log(err);
    }
  };

  tileClick(data) {
    this.callTileApi({
      username: this.state.submitedUser,
      clickOn: data,
      clickTime: new Date()
    })
      .then(res => console.log(JSON.stringify(res.data)))
      .catch(err => console.log(err));
  }

  callTileApi = async data => {
    try {
      const response = await fetch("http://localhost:8080/api/onClickTile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { username, row, column, submitedUser } = this.state;
    return (
      <div>
        {!submitedUser && (
          <form onSubmit={this.submitForm} style={{ margin: 10 }}>
            <div>
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={this.onChangeUsername}
                required
              />
              <input type="submit" value="Submit" />
            </div>
          </form>
        )}
        {submitedUser && (
          <div>
            <span>Welcome, {submitedUser}</span>
            {row.map((r, ri) => {
              return (
                <div
                  key={ri}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {column.map((c, ci) => {
                    return (
                      <div
                        key={ci}
                        style={{
                          margin: 10,
                          height: 20,
                          width: 20,
                          padding: 20,
                          background: "blue",
                          cursor: "pointer"
                        }}
                        onClick={() => this.tileClick(c + 1 + ri * 8)}
                      >
                        {c + 1 + ri * 8}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
