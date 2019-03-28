import React, { Component } from 'react';
import axios from 'axios';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './DeleteSummary.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler  from '../../../hoc/withErrorHandler/withErrorHandler';

class DeleteSummary extends Component {
    state = {
        deleting: false,
        error: ''
    }

    deleteItem = (id) => {
        this.setState({deleting: true});
        axios.delete(`/film/${id}`)
            .then(film => {
                console.log(film);
                this.props.onDeletingFinish(id);
                this.props.onDelete(false, '');
                this.setState({deleting: false});
            })
            .catch(error => {
                console.log(error);
                this.props.onDelete(false, '');
                this.setState({
                    error: error,
                    deleting: false
                });
            });
    };

    render() {
        let form = (
            <Auxiliary>
                <h4>Are you realy want to delete this film?</h4>
                <p>{this.props.deleting_info.title}</p>
                <Button 
                    btnType="Danger" 
                    disabled={false}
                    clicked={() => this.deleteItem(this.props.deleting_info._id)}>Delete</Button>
            </Auxiliary>
        );
        if (this.state.posting) {
            form = <Spinner />;
        }

        return (
            <div className={classes.DeleteSummary}>
                {form}
            </div>
        ); 
    }
};

export default withErrorHandler(DeleteSummary, axios);