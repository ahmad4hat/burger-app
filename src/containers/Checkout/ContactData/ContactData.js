import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import CssClasses from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'  

 class ContactData extends Component {

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
                valid:false,
                touched:false
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
                valid:false,
                touched:false
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
                valid:false,
                touched:false
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
                valid:false,
                touched:false
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
                valid:false,
                touched:false
            },
           
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value :'fastest', displayValue :'Fastest'},
                        {value :'cheapest', displayValue :'Cheapest'},
                    ]
                },
                value:'fastest',
                valid:true,
                validation:{
                }
               
            },
        },
        formIsValid:false

    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData={};
        for(let formElementIdentifier in this.state.orderFrom)
        {
            formData[formElementIdentifier] =this.state.orderFrom[formElementIdentifier].value;

        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData

        };
        this.props.onOrderBurger(order,this.props.token);

       

    }

    checkValidity=(value,rules)=>{
        let isValid =true;
        if(rules && rules.required)
        {
            isValid=value.trim() !=='' && isValid;
        }
        if(rules && rules.minLength){
            isValid=value.length>= rules.minLength &&isValid;

        }

        if(rules && rules.maxLength){
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
        updatedfromElement.touched=true;
        updateOderfrom[inputIdentifier]=updatedfromElement;

        let formIsValid=true;
        for(let inputIdentifier in updateOderfrom){
            formIsValid=updateOderfrom[inputIdentifier].valid && formIsValid;
        }




        this.setState({orderFrom:updateOderfrom ,formIsValid});
       

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
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        touched={formElement.config.touched}
                        />
                    ))
                }
                <Button disabled={!this.state.formIsValid} btnType="Success" >ORDER</Button>
            </form>);
        if (this.props.loading) {
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

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price :state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token
    }
};

const mapDispatchToProps=dispatch=>{
   return {
    onOrderBurger : (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token) )
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));