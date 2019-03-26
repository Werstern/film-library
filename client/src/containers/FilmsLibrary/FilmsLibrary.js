import React, { Component } from 'react';

import classes from './FilmsLibrary.css';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import FilmsPalette from '../../components/FilmsLibrary/FilmsPalette/FilmsPalette';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import ActionSummary from '../../components/FilmsLibrary/ActionSummary/ActionSummary';
import DeleteSummary from '../../components/FilmsLibrary/DeleteSummary/DeleteSummary';
import SearchPanel from '../../components/FilmsLibrary/SearchPanel/SearchPanel';

export class FilmsLibrary extends Component {
    
    render() {
        let filmPalette = <Spinner />;
        if (!this.props.loading) {
            filmPalette = (
                <FilmsPalette 
                    films={this.props.films}
                    onDelete={this.props.onDelete} />
            );
        }

        let searching = null;
        if (this.props.searching) {
            searching = (
                <SearchPanel 
                    onSearching={this.props.onSearching}
                    onSearchFinish={this.props.onSearchFinish} />
            );
        }
        return (
            <Auxiliary>
                <Modal show={this.props.adding} modalClosed={this.props.onAdding}>
                    <ActionSummary onAdding={this.props.onAdding} />
                </Modal>
                <Modal show={this.props.deleting} modalClosed={() => this.props.onDelete(false, '')}>
                    <DeleteSummary 
                        deleting_info={this.props.deleting_info}
                        onDelete={this.props.onDelete}
                        onDeletingFinish={this.props.onDeletingFinish} />
                </Modal>
                {searching}
                {filmPalette}
            </Auxiliary>
        )
    }
}

export default FilmsLibrary;