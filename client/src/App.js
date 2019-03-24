import React, { Component } from 'react';
import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import FilmLibrary, { FilmsLibrary } from './containers/FilmsLibrary/FilmsLibrary';

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
    fetch('/films/6')
      .then(res => res.json())
      .then(films => this.setState({ films }));
  }

  render() {
    return (
      <div>
        <Layout>
          <h1 className={classes.AppTitle}>Popular Movies</h1>
          <FilmsLibrary films={this.state.films} />
        </Layout>
      </div>
    );
  }
}

export default App;