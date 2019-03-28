import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import FilmsPalette from '../../components/FilmsLibrary/FilmsPalette/FilmsPalette';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import ActionSummary from '../../containers/ActionSummary/ActionSummary';
import FileSummary from '../../containers/FileSummary/FileSummary';
import DeleteSummary from '../../containers/DeleteSummary/DeleteSummary';
import SearchPanel from '../SearchPanel/SearchPanel';

export class FilmsLibrary extends Component {
    state = {
        mode: 'addingForm'
    }

    changeModeHandler = () => {
        const mode = this.state.mode;
        if (mode === 'addingForm') {
            this.setState({mode: 'fileForm'});
        } else {
            this.setState({mode: 'addingForm'});
        }
    }

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
                    <Button 
                        btnType="Success" 
                        clicked={this.changeModeHandler}>Change mode</Button>
                    {
                        this.state.mode === 'addingForm' ?
                            <ActionSummary onAdding={this.props.onAdding} />
                            : <FileSummary onAdding={this.props.onAdding} />
                    }
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