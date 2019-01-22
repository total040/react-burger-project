import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './ContactData.css';

import * as orderActions from '../../../store/actions/index';
import {checkValidity} from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name please'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email please'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street please'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postcode please'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country please'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        isFormValid: false,
        loading: false
    };

    changedHandler = (event, inputFormId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElem = {
            ...updatedOrderForm[inputFormId]
        };
        updatedFormElem.value = event.target.value;
        updatedFormElem.valid = checkValidity(updatedFormElem.value, updatedFormElem.validation);
        updatedFormElem.touched = true;
        console.log('Valid? ', updatedFormElem.valid);
        updatedOrderForm[inputFormId] = updatedFormElem;

        let isFormValid = true;
        for (let key in updatedOrderForm) {
            isFormValid = updatedOrderForm[key].valid && isFormValid;
        }
        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});
    };

    orderHandler = (event) => {
        event.preventDefault();

        const orderData = {};
        for (let inputFormId in this.state.orderForm) {
            orderData[inputFormId] = this.state.orderForm[inputFormId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: orderData,
            userId: this.props.userId
        };
        /*  this.setState({loading: true});
            axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
            });*/
        this.props.onBurgerOrder(order, this.props.token);
    };

    render() {
        const formsArray = [];
        for (let key in this.state.orderForm) {
            formsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form >
                {formsArray.map(inputForm => (
                    <Input
                        key={inputForm.id}
                        elementType={inputForm.config.elementType}
                        elementConfig={inputForm.config.elementConfig}
                        value={inputForm.config.value}
                        invalid={!inputForm.config.valid}
                        shouldValidate={inputForm.config.validation}
                        touched={inputForm.config.touched}
                        changed={(event) => this.changedHandler(event, inputForm.id)}
                    />
                ))}
            </form>
        );

        if(this.props.loading) {
            form = <Spinner/>;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
                <Button clicked={this.orderHandler} type="Success" disabled={!this.state.isFormValid}>ORDER</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));