import React, { Component } from "react";
import moment from "moment";
// import PropTypes from "prop-types";

export default class Alert extends Component {
  state = {
    alert: null,
    sortOn: "clickTime",
    sortDirection: "asc"
  };

  constructor(props) {
    super(props);

    this.sort = this.sort.bind(this);
  }

  componentDidMount = () => {
    this.callGetUnusualSequence(this.props.match.params.id)
      .then(res => this.setState({ alert: res.data }))
      .catch(err => console.log(err));
  };

  callGetUnusualSequence = async id => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/getUnusualSequenceById/${id}`
      );
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    } catch (err) {
      console.log(err);
    }
  };

  sortNumber(data, sortOn) {
    return data.sort(function(a, b) {
      return a[sortOn] - b[sortOn];
    });
  }

  sortString(data, sortOn) {
    return data.sort(function(a, b) {
      var A = a[sortOn].toUpperCase();
      var B = b[sortOn].toUpperCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    });
  }

  sortDate(data, sortOn) {
    return data.sort(function(a, b) {
      return new Date(b[sortOn]) - new Date(a[sortOn]);
    });
  }

  sort(sortFor, dataType) {
    const { alert, sortOn, sortDirection } = this.state;
    let sortedData = [];
    if (dataType === "string") {
      sortedData = this.sortString(alert.sequenceData, sortFor);
    }
    if (dataType === "number") {
      sortedData = this.sortNumber(alert.sequenceData, sortFor);
    }
    if (dataType === "date") {
      sortedData = this.sortDate(alert.sequenceData, sortFor);
    }
    if (sortFor === sortOn && sortDirection === "asc") {
      const reverseData = sortedData.reverse();
      sortedData = reverseData;
      this.setState({ sortDirection: "des" });
    } else {
      this.setState({ sortDirection: "asc" });
    }
    this.setState({ sortOn: sortFor });
  }

  render() {
    const { alert, sortOn, sortDirection } = this.state;
    return (
      <div>
        <h3>Un Usual Sequence</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {alert &&
            alert.sequence.map((item, i) => (
              <div key={i} style={{ margin: 10 }}>
                {item}
              </div>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h3>Sequence</h3>
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    width: 150,
                    cursor: "pointer"
                  }}
                  onClick={() => this.sort("username", "string")}
                >
                  <span style={{ paddingRight: 10 }}>Username</span>
                  {sortOn === "username" && (
                    <div
                      className={
                        sortDirection === "asc" ? "arrow-up" : "arrow-down"
                      }
                    />
                  )}
                </th>
                <th
                  style={{
                    width: 150,
                    cursor: "pointer"
                  }}
                  onClick={() => this.sort("clickOn", "number")}
                >
                  <span style={{ paddingRight: 10 }}>Number</span>
                  {sortOn === "clickOn" && (
                    <div
                      className={
                        sortDirection === "asc" ? "arrow-up" : "arrow-down"
                      }
                    />
                  )}
                </th>
                <th
                  style={{
                    width: 200,
                    cursor: "pointer"
                  }}
                  onClick={() => this.sort("clickTime", "date")}
                >
                  <span style={{ paddingRight: 10 }}>time</span>
                  {sortOn === "clickTime" && (
                    <div
                      className={
                        sortDirection === "asc" ? "arrow-up" : "arrow-down"
                      }
                    />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {alert &&
                alert.sequenceData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.username}</td>
                    <td>{item.clickOn}</td>
                    <td>{moment(item.clickTime).format("L LTS")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
