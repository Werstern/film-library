import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import FilmsPalette from '../../components/FilmsLibrary/FilmsPalette/FilmsPalette';
import Modal from '../../components/UI/Modal/Modal';
import ActionSummary from '../../components/FilmsLibrary/ActionSummary/ActionSummary';
import DeleteSummary from '../../components/FilmsLibrary/DeleteSummary/DeleteSummary';

export class FilmsLibrary extends Component {

    render() {
        return (
            <Auxiliary>
                <Modal show={this.props.adding} modalClosed={this.props.onAdditingCancel}>
                    <ActionSummary onAdditingCancel={this.props.onAdditingCancel} />
                </Modal>
                <Modal show={this.props.deleting} modalClosed={this.props.onDeletingCancel}>
                    <DeleteSummary 
                        deleting_id={this.props.deleting_id}
                        onDeletingCancel={this.props.onDeletingCancel}
                        onDeletingFinish={this.props.onDeletingFinish} />
                </Modal>
                <FilmsPalette 
                    films={this.props.films}
                    onDeletingStart={this.props.onDeletingStart} />
            </Auxiliary>
        )
    }
}

export default FilmsLibrary;