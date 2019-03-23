import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    films: []
  }

  componentDidMount() {
    fetch('/films/4')
      .then(res => res.json())
      .then(films => this.setState({ films }));
  }

  render() {
    return (
      <div className="App">
        <h1>Films</h1>
        {this.state.films.map(film =>
          <div key={film._id}>{film.title}</div>
        )}
      </div>
    );
  }
}

export default App;