import React, { Component } from 'react';

class App extends Component {
  state = {
    message: '',
    input: '',
    response: ''
  };

  async componentDidMount() {
    const res = await fetch('http://localhost:5000/api/hello');
    const text = await res.text();
    this.setState({ message: text });
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/world', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input })
    });

    const text = await res.text();
    this.setState({ response: text });
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Type something..."
          />
          <button type="submit">Submit</button>
        </form>

        {this.state.response && (
          <p style={{ marginTop: '1rem' }}>{this.state.response}</p>
        )}
      </div>
    );
  }
}

export default App;
