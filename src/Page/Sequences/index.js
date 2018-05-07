import React, { Component } from "react";

export default class Sequences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Sequence: [],
      SequenceData: [],
      number: "",
      error: ""
    };
    this.changeNumber = this.changeNumber.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.addSequence = this.addSequence.bind(this);
  }

  static propTypes = {};

  componentDidMount() {
    this.callGetSequence().then((res) => this.setState({ SequenceData: res.data})).catch((err) => console.log(err));
  }

  changeNumber(e) {
    if (this.state.error) {
      this.setState({ error: "" });
    }
    this.setState({ number: e.target.value });
  }

  addNumber() {
    const { number, Sequence } = this.state;
    if (number && number >= 1 && number <= 64 && Sequence.indexOf(number) === -1) {
      this.setState((state, props) => {
        return { Sequence: [...state.Sequence, state.number], number: "" };
      });
    } else {
      this.setState({ error: "enter valid number", number: "" });
    }
  }

  addSequence() {
    this.callSequenceApi({sequence: this.state.Sequence}).then((res) => alert(res.data.sequence)).catch((err) => console.log(err));
  }

  callSequenceApi = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/addSequence", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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

  callGetSequence =  async () => {
    try {
      const response = await fetch("http://localhost:8080/api/getSequence");
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    const { number, Sequence, error, SequenceData } = this.state;
    return (
      <div style={{ margin: 10 }}>
        <input type="number" value={number} onChange={this.changeNumber} />
        <input type="button" value="Add" onClick={this.addNumber} />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form onSubmit={this.addSequence}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {Sequence.map((val, i) => (
              <div key={i} style={{ margin: 10 }}>
                {val}
              </div>
            ))}
           
          </div>
          <div>
              {Sequence.length > 0 && (
                <input type="submit" value="Add Sequence" />
              )}
            </div>
        </form>
        {
            SequenceData.map((item, index) => <div key={index} style={{ display: 'flex', justifyContent: 'center'}}>{
                item.sequence.map((data, index1) => <div key={index1} style={{margin: 10}}>{data}</div>)
            }</div>)
        }
      </div>
    );
  }
}
