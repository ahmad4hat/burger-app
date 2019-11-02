import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import CssClasses from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {

    state = {
        orderFrom: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'Your Name'
                },
                value:""
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'Street'
                },
                value:""
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'ZIP-CODE'
                },
                value:""
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'Country'
                },
                value:""
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder :'Your Email'
                },
                value:""
            },
           
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value :'fastest', displayValue :'Fastest'},
                        {value :'cheapest', displayValue :'Cheapest'},
                    ]
                },
                value:""
            },
        },

        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price

        };

        axios.post('/orders.json', order)
            .then(responce => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));

    }
    render() {
        const formElements=[];
        for(let key in this.state.orderFrom){
            formElements.push({
              id:key,
              config:this.state.orderFrom[key]
            });
        }


        let form = (<form>
            {
                formElements.map(formElement=>(
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.value}
                    />
                ))
            }
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = (<Spinner />);
        }

        return (
            <div className={CssClasses.ContactData}>
                <h4>Enter the Contact Data</h4>
                {form}
            </div>
        )
    }
}
