import React, { Component } from 'react';
import axios from 'axios';

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

  addingHandler = () => {
    this.setState((prevState) => {
      return {
        adding: !prevState.adding
      }
    });
  }

  searchingHandler = () => {
    this.setState((prevState) => {
      return {
        searching: !prevState.searching
      }
    });
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

  returnHomepageHandler = () => {
    this.fetchingInitialFilms();
  }

  fetchingInitialFilms() {
    this.setState({loading: true});
    axios.get('/films/42')
      .then(films => {
        this.setState({ loading: false, films: films.data });
      });
  }

  render() {
    return (
      <div>
        <Layout 
          onSearching={this.searchingHandler}
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
            onSearching={this.searchingHandler}
            onSearchFinish={this.searchFinishHandler} />
        </Layout>
      </div>
    );
  }
}

export default App;