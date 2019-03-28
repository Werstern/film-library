import React, { Component } from 'react';
import axios from 'axios';

import withErrorHandler  from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner'
import { updateObject, checkValidaty } from '../../../shared/utility';

import classes from './SearchPanel.css';

class SearchPanel extends Component {
    state = {
        searchingForm: {
            type: {
                elementType: 'select',
                elementConfig: {
                  options: [
                    {value: 'title', displayValue: 'Title'},
                    {value: 'star', displayValue: 'Star'}
                  ]
                },
                value: 'title',
                validation: {},
                valid: true
              },
            title: {
                elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Type here...'
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
        stage: 0,
        loading: false,
        error: ''
    }

    componentWillUnmount() {
        this.setState({loading: false});
    }

    stepNextHandler = (event, stage) => {
        event.preventDefault();
        switch (stage) {
            case 0:
                this.setState({stage: 1});
                break;
            case 1:
                const formData = {};
                for (let formElementIdentifier in this.state.searchingForm) {
                    formData[formElementIdentifier] = this.state.searchingForm[formElementIdentifier].value;
                }

                this.setState({loading: true});
                axios.get(`/films?${formData.type}=${formData.title ? formData.title : formData.star}`)
                    .then(films => {
                        this.props.onSearchFinish(films.data);
                    })
                    .catch(error => this.setState({
                        error: error,
                        loading: false
                    }));
                break;
            default: 
                this.setState({stage: 0})
        }
    }

    stepBackHandler = (event, stage) => {
        event.preventDefault();
        switch (stage) {
            case 0:
                this.props.onSearching();
                break;
            default: 
                this.setState({stage: 0})
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let newObject = {
            value: event.target.value,
            valid: checkValidaty(event.target.value, this.state.searchingForm[inputIdentifier].validation),
            touched: true
        }

        if (inputIdentifier === 'type') {
            newObject = {
                value: event.target.value,
                valid: checkValidaty(event.target.value, this.state.searchingForm[inputIdentifier].validation)
            };
        }

        const updatedFormElement = updateObject(this.state.searchingForm[inputIdentifier], newObject);
        const updatedAddingForm = updateObject(this.state.searchingForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedAddingForm) {
            formIsValid = updatedAddingForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({searchingForm: updatedAddingForm, formIsValid: formIsValid});
    }

    formValidationHandler = () => {
        if (this.state.stage === 0) {
            return false;
        } else {
            return !this.state.formIsValid;
        }
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.searchingForm) {
            formElementsArray.push({
              id: key,
              config: this.state.searchingForm[key]
            });
        }
        const formElement = formElementsArray[this.state.stage];
        let form = (
            <form>
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                <Button 
                    btnType="Danger" 
                    clicked={(event) => this.stepBackHandler(event, this.state.stage)}>Cancel</Button>
                <Button 
                    btnType="Success" 
                    disabled={this.formValidationHandler()} 
                    clicked={(event) => this.stepNextHandler(event, this.state.stage)}>Next</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.SearchPanel}>
                <h3>Searching panel</h3>
                {form}
            </div>
        );
    }
}

export default withErrorHandler(SearchPanel, axios);