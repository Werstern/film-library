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
    deleting_info: '',
    error: ''
  }

  componentDidMount() {
    this.fetchingInitialFilms();
  }

  deleteHandler = (status, id) => {
    let deleting_info = id;
    if (id) {
      deleting_info = [...this.state.films].filter(film => {
        return film._id === id;
      })[0];
    }
    
    this.setState({deleting: status, deleting_info: deleting_info});
  }

  deleteFinishHandler = (id) => {
    const updatedFilms = [...this.state.films].filter(film => {
      return film._id !== id;
    });

    this.setState({films: updatedFilms});
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
            deleting_info={this.state.deleting_info}
            onAdding={this.addingHandler}
            onDelete={this.deleteHandler}
            onDeletingFinish={this.deleteFinishHandler}
            onSearchCancel={this.searchCancelHandler}
            onSearchFinish={this.searchFinishHandler} />
        </Layout>
      </div>
    );
  }
}

export default App;