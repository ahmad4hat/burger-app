import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux'
import Button from '../../components/UI/Button/Button';
import CssClasses from './Auth.module.css';
import * as actions from '../../store/actions/index'

export class Auth extends Component {


    state={ 
        controls :{
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder :'Mail address'
                },
                value:"",
                validation:{
                    required :true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder :'password'
                },
                value:"",
                validation:{
                    required :true,
                    minLength :6
                },
                valid:false,
                touched:false
            },
        }
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

        if(rules && rules.isEmail)
        {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test( value ) && isValid;
              
        }

        return isValid;

    }



    inputChangedHandler=(event,controlName)=>{
        const updatedControls ={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value :event.target.value,
                valid :this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched :true
            }
        }

        this.setState({controls:updatedControls});

    }

    submitHandler=(event)=>{
        console.log("hello");
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value);
    }
    
    render() {
        const formElements=[];
        for(let key in this.state.controls){
            formElements.push({
              id:key,
              config:this.state.controls[key]
            });
        }

        const form =formElements.map(formElement=>{
            return (
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
            );
        })



        return (
            <div className={CssClasses.Auth}>
                <form onSubmit={this,this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                
            </div>
        );
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password)=>dispatch(actions.auth(email,password))
    }
}

export default connect(null,mapDispatchToProps) (Auth);
