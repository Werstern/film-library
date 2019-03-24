import React, { Component } from 'react';
import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import FilmsLibrary from './containers/FilmsLibrary/FilmsLibrary';

class App extends Component {
  state = {
    films: [],
    searching: false,
    search_type: '',
    search_value: '',
    additing: false,
    loading: false,
    error: ''
  }

  componentDidMount() {
    fetch('/films/6')
      .then(res => res.json())
      .then(films => this.setState({ films }));
  }

  searchStartHandler = () => {
    this.setState({searching: true});
  }

  searchCancelHandler = () => {
    this.setState({searching: false});
  }

  render() {
    return (
      <div>
        <Layout onSearchStart={this.searchStartHandler}>
          <h1 className={classes.AppTitle}>Popular Movies</h1>
          <FilmsLibrary 
            films={this.state.films}
            searching={this.state.searching}
            onSearchCancel={this.searchCancelHandler} />
        </Layout>
      </div>
    );
  }
}

export default App;