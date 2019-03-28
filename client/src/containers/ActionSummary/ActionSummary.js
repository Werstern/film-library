import React, { Component } from 'react';
import axios from 'axios';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ActionSummary.css';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidaty } from '../../shared/utility';
import withErrorHandler  from '../../hoc/withErrorHandler/withErrorHandler';

class ActionSummary extends Component {
  state = {
    addingForm: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Film Title'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      releaseYear: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Release year'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      stars: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Film stars'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      image: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Image URL'
        },
        value: '',
        validation: {},
        valid: true
      },
      format: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Blu-Ray', displayValue: 'Blu-Ray'},
            {value: 'VHS', displayValue: 'VHS'},
            {value: 'DVD', displayValue: 'DVD'}
          ]
        },
        value: 'Blue-Ray',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    posting: false,
    error: ''
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.addingForm) {
      formData[formElementIdentifier] = this.state.addingForm[formElementIdentifier].value;
    }
    
    this.setState({posting: true});
    axios.post('/films', formData)
      .then(films => {
        const resetState = {...this.state.addingForm};
        const formIsValid = false;
        for (let formElementIdentifier in resetState) {
          if (formElementIdentifier === 'format') {
            resetState[formElementIdentifier].value = 'Blue-Ray';
            resetState[formElementIdentifier].valid = true;
          } else if (formElementIdentifier === 'image') {
            resetState[formElementIdentifier].value = '';
            resetState[formElementIdentifier].valid = true;
          } else {
            resetState[formElementIdentifier].value = '';
            resetState[formElementIdentifier].valid = false;
            resetState[formElementIdentifier].touched = false;
          }
        }

        this.setState({
          addingForm: resetState, 
          formIsValid: formIsValid,
          posting: false});
          
        this.props.onAdding();
      })
      .catch(error => this.setState({
        error: error,
        posting: false
      }));
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.addingForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidaty(event.target.value, this.state.addingForm[inputIdentifier].validation),
      touched: true
    });
    const updatedAddingForm = updateObject(this.state.addingForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedAddingForm) {
      formIsValid = updatedAddingForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({addingForm: updatedAddingForm, formIsValid: formIsValid});
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.addingForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addingForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
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
      <div className={classes.ActionSummary}>
        <h4>Adding Menu</h4>
        {form}
      </div>
    );
  }
};

export default withErrorHandler(ActionSummary, axios);