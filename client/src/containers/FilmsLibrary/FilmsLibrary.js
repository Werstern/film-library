import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import FilmsPalette from '../../components/FilmsLibrary/FilmsPalette/FilmsPalette';
import Modal from '../../components/UI/Modal/Modal';
import ActionSummary from '../../components/FilmsLibrary/ActionSummary/ActionSummary';

export class FilmsLibrary extends Component {

    state = {
        showing: false
    }

    render() {
        return (
            <Auxiliary>
                <Modal show={this.state.showing} modalClosed={this.shovingCancelHandler}>
                    <ActionSummary />
                </Modal>
                <FilmsPalette films={this.props.films} />
            </Auxiliary>
        )
    }
}

export default FilmsLibrary;