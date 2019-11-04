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
                value:"",
                validation:{
                    required :true
                },
                valid:false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'Street'
                },
                value:"",
                validation:{
                    required :true
                },
                valid:false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'ZIP-CODE'
                },
                value:"",
                validation:{
                    required :true,
                    minLength:5,
                    maxLength:5
                },
                valid:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder :'Country'
                },
                value:"",
                validation:{
                    required :true
                },
                valid:false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder :'Your Email'
                },
                value:"",
                validation:{
                    required :true
                },
                valid:false
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
        const formData={};
        for(let formElementIdentifier in this.state.orderFrom)
        {
            formData[formElementIdentifier] =this.state.orderFrom[formElementIdentifier].value;

        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData

        };

        axios.post('/orders.json', order)
            .then(responce => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));

    }

    checkValidity=(value,rules)=>{
        let isValid =true;
        if(rules.required)
        {
            isValid=value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length>= rules.minLength &&isValid;

        }

        if(rules.maxLength){
            isValid=value.length<= rules.maxLength &&isValid;

        }

        return isValid;

    }

    inputChangedHandler=(event,inputIdentifier)=>{

        const updateOderfrom={
            ...this.state.orderFrom
        };
        const updatedfromElement={ 
            ...updateOderfrom[inputIdentifier]
        };
        updatedfromElement.value=event.target.value;
        updatedfromElement.valid=this.checkValidity(updatedfromElement.value,updatedfromElement.validation);
        console.log(updatedfromElement);
        updateOderfrom[inputIdentifier]=updatedfromElement;
        this.setState({orderFrom:updateOderfrom});
       

    }

    render() {
        const formElements=[];
        for(let key in this.state.orderFrom){
            formElements.push({
              id:key,
              config:this.state.orderFrom[key]
            });
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElements.map(formElement=>(
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.value}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        />
                    ))
                }
                <Button btnType="Success" >ORDER</Button>
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
