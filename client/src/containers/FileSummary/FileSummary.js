import React, { Component } from 'react';
import axios from 'axios';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './FileSummary.css';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidaty } from '../../shared/utility';
import withErrorHandler  from '../../hoc/withErrorHandler/withErrorHandler';

class FileSummary extends Component {
    state = {
        fileForm: {
            file: {
              elementType: 'input',
              elementConfig: {
                type: 'file',
                name: 'file'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
        },
        formIsValid: false,
        posting: false,
        error: ''
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', this.state.fileForm.file.value);
        
        this.setState({posting: true});
        axios.post('/import', formData)
            .then(response => {
                const resetState = {...this.state.fileForm};
                const formIsValid = false;
                resetState.file.value = '';
                resetState.file.valid = false;
                resetState.file.touched = false;

                this.setState({
                    fileForm: resetState, 
                    formIsValid: formIsValid,
                    posting: false
                });
                this.props.onAdding();
            })
            .catch(error => {
                this.setState({
                    error: error,
                    posting: false
                });
                this.props.onAdding();
            });
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.fileForm[inputIdentifier], {
            value: event.target.files[0],
            valid: checkValidaty(event.target.value, this.state.fileForm[inputIdentifier].validation),
            touched: true
        });
        const updatedFileForm = updateObject(this.state.fileForm, {
            [inputIdentifier]: updatedFormElement
        });
    
        let formIsValid = true;
        for (let inputIdentifier in updatedFileForm) {
            formIsValid = updatedFileForm[inputIdentifier].valid && formIsValid;
        }
    
        this.setState({fileForm: updatedFileForm, formIsValid: formIsValid});
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.fileForm) {
            formElementsArray.push({
                id: key,
                config: this.state.fileForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Add</Button>
            </form>
        );
        if (this.state.posting) {
        form = <Spinner />;
        }
        return (
            <div className={classes.FileSummary}>
                <h4>File adding Menu</h4>
                {form}
            </div>
        );
    }
}

export default withErrorHandler(FileSummary, axios);