import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import FilmsPalette from '../../components/FilmsLibrary/FilmsPalette/FilmsPalette';
import Modal from '../../components/UI/Modal/Modal';
import ActionSummary from '../../components/FilmsLibrary/ActionSummary/ActionSummary';

export class FilmsLibrary extends Component {

    render() {
        return (
            <Auxiliary>
                <Modal show={this.props.searching} modalClosed={this.props.onSearchCancel}>
                    <ActionSummary />
                </Modal>
                <FilmsPalette films={this.props.films} />
            </Auxiliary>
        )
    }
}

export default FilmsLibrary;