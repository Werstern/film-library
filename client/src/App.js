import React, { Component } from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';

class App extends Component {
  state = {
    films: [],
    additing: false,
    searching: false,
    search_type: '',
    search_value: '',
    loading: false,
    error: ''
  }

  componentDidMount() {
    fetch('/films/4')
      .then(res => res.json())
      .then(films => this.setState({ films }));
  }

  render() {
    return (
      <div>
        <Layout>
          <h1>Films</h1>
          {this.state.films.map(film =>
            <div key={film._id}>{film.title}</div>
          )}
        </Layout>
      </div>
    );
  }
}

export default App;