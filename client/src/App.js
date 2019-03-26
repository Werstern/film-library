import React, { Component } from 'react';

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
    this.fetchingInitialFilms();
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

  addingHandler = (value) => {
    this.setState({adding: value});
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
    this.fetchingInitialFilms();
  }

  fetchingInitialFilms() {
    this.setState({loading: true});
    fetch('/films/12')
      .then(res => res.json())
      .then(films => {
        this.setState({ loading: false, films: films });
      });
  }

  render() {
    return (
      <div>
        <Layout 
          onSearchStart={this.searchStartHandler}
          onAdding={this.addingHandler}
          onReturnHomepage={this.returnHomepageHandler} >
          <FilmsLibrary 
            loading={this.state.loading}
            films={this.state.films}
            adding={this.state.adding}
            searching={this.state.searching}
            deleting={this.state.deleting}
            deleting_id={this.state.deleting_id}
            onAdding={this.addingHandler}
            onDeletingStart={this.deletingStartHandler}
            onDeletingFinish={this.deleteFinishHandler}
            onDeletingCancel={this.deletingCancelHandler}
            onSearchCancel={this.searchCancelHandler}
            onSearchFinish={this.searchFinishHandler} />
        </Layout>
      </div>
    );
  }
}

export default App;