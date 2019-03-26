import React, { Component } from 'react';
import axios from 'axios';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './DeleteSummary.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class DeleteSummary extends Component {
    state = {
        deleting: false
    }
    deleteItem = (id) => {
        this.setState({deleting: true});
        axios.delete(`/film/${id}`)
            .then(film => {
                this.props.onDeletingFinish(id);
                this.props.onDelete(false, '');
                this.setState({deleting: false});
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

export default DeleteSummary;