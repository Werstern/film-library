import React, { Component } from 'react';
import axios from 'axios';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
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
        stage: 0
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

                axios.get(`/films?${formData.type}=${formData.title ? formData.title : formData.star}`)
                    .then(films => {
                        console.log(films.data);
                        this.props.onSearchFinish(films.data);
                    });
                break;
            default: 
                this.setState({stage: 0})
        }
    }

    stepBackHandler = (event, stage) => {
        event.preventDefault();
        switch (stage) {
            case 0:
                this.props.onSearchCancel();
                break;
            case 1:
                this.setState({stage: 0});
                break;
            default: 
                this.setState({stage: 0})
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //touched: true
        const updatedFormElement = updateObject(this.state.searchingForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidaty(event.target.value, this.state.searchingForm[inputIdentifier].validation)
        });
        const updatedAddingForm = updateObject(this.state.searchingForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedAddingForm) {
            formIsValid = updatedAddingForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({searchingForm: updatedAddingForm, formIsValid: formIsValid});
    }
    
    render() {
        //!this.state.formIsValid
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
                <Button btnType="Danger" disabled={false} clicked={(event) => this.stepBackHandler(event, this.state.stage)}>Cancel</Button>
                <Button btnType="Success" disabled={false} clicked={(event) => this.stepNextHandler(event, this.state.stage)}>Next</Button>
            </form>
        )
        return (
            <div className={classes.SearchPanel}>
                <h3>Searching panel</h3>
                {form}
            </div>
        );
    }
}

export default SearchPanel;