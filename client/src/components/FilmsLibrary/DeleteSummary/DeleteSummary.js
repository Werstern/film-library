import React from 'react';
import axios from 'axios';

import classes from './DeleteSummary.css';
import Button from '../../UI/Button/Button';

const deleteSummary = (props) => {
    const deleteItem = (id) => {
        axios.delete(`/film/${id}`)
            .then(film => {
                props.onDeletingCancel();
                props.onDeletingFinish(id);
            });
    };

    return (
        <div className={classes.DeleteSummary}>
            <h4>Are you realy wont to delete film?</h4>
            <Button 
                btnType="Danger" 
                disabled={false}
                clicked={() => deleteItem(props.deleting_id)}>Delete</Button>
        </div>
    );
};

export default deleteSummary;