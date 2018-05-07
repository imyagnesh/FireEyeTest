import React, { Component } from "react";
import { Link } from "react-router-dom";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unusualSequence: []
    };
  }

  componentDidMount = () => {
    this.callGetUnusualSequence()
      .then(res => this.setState({ unusualSequence: res.data }))
      .catch(err => console.log(err));
  };

  callGetUnusualSequence = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/getUnusualSequence"
      );
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { unusualSequence } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {unusualSequence.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignSelf: "center",
              margin: "10px 0"
            }}
          >
            {item.sequence.map((item1, i1) => (
              <div key={i1} style={{ margin: 10 }}>
                {item1}
              </div>
            ))}
            <Link to={`/alert/${item._id}`}>View</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Alerts;
