import React, { Component } from 'react';
import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import FilmsLibrary from './containers/FilmsLibrary/FilmsLibrary';

class App extends Component {
  state = {
    films: [],
    searching: false,
    adding: false,
    loading: false,
    deleting: false,
    deleting_id: '',
    error: ''
  }

  componentDidMount() {
    fetch('/films/12')
      .then(res => res.json())
      .then(films => this.setState({ films }));
  }

  deletingStartHandler = (id) => {
    this.setState({deleting: true, deleting_id: id});
  }

  deleteFinishHandler = (id) => {
    const updatedFilms = [...this.state.films].filter(film => {
      return film._id !== id;
    });

    this.setState({films: updatedFilms});
  }

  deletingCancelHandler = () => {
    this.setState({deleting: false, deleting_id: ''});
  }

  addingStartHandler = () => {
    this.setState({adding: true});
  }

  addingCancelHandler = () => {
    this.setState({adding: false});
  }

  searchStartHandler = () => {
    this.setState({searching: true});
  }

  searchFinishHandler = (films) => {
    if (Array.isArray(films)) {
      this.setState({
        films: films,
        searching: false 
      });
    } else if (films === null) {
      this.setState({
        films: [],
        searching: false 
      });
    } else {
      const updatedFilm = [films];
      this.setState({
        films: updatedFilm,
        searching: false 
      });
    }
  }

  searchCancelHandler = () => {
    this.setState({searching: false});
  }

  returnHomepageHandler = () => {
    fetch('/films/12')
      .then(res => res.json())
      .then(films => this.setState({ films }));
  }

  render() {
    return (
      <div>
        <Layout 
          onSearchStart={this.searchStartHandler}
          onAddingStart={this.addingStartHandler}
          onAddingCancel={this.addingCancelHandler}
          onReturnHomepage={this.returnHomepageHandler} >
          <h1 className={classes.AppTitle}>Popular Movies</h1>
          <FilmsLibrary 
            films={this.state.films}
            adding={this.state.adding}
            searching={this.state.searching}
            onAdditingCancel={this.addingCancelHandler}
            deleting={this.state.deleting}
            onDeletingStart={this.deletingStartHandler}
            onDeletingFinish={this.deleteFinishHandler}
            onDeletingCancel={this.deletingCancelHandler}
            onSearchCancel={this.searchCancelHandler}
            deleting_id={this.state.deleting_id}
            onSearchFinish={this.searchFinishHandler} />
        </Layout>
      </div>
    );
  }
}

export default App;