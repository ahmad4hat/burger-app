import React, { Component ,useState,useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import CssClasses from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {updateObject,checkValidity} from '../../shared/utility';

export const Auth=props=> {


    const [authForm,setAuthForm]=useState({
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
            
        })
    const [isSignup,setIsSignup]=useState(true)

    useEffect(()=>{
        if(!props.buildingBurger && props.authRedirectPath !=='/'){
            props.onSetAuthRedirectPath()

        }
    },[])



    const inputChangedHandler=(event,controlName)=>{
        const updatedControls = updateObject(authForm,{
            [controlName]:updateObject(authForm[controlName] ,{
                value :event.target.value,
                valid :checkValidity(event.target.value,authForm[controlName].validation),
                touched :true
            }
            )
        })
        setAuthForm(updatedControls);
    }   


    const switchAuthModeHandler=()=>{
       setIsSignup(!isSignup);

    };

    const submitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignup);
    }
    
        const formElements=[];
        for(let key in authForm){
            formElements.push({
              id:key,
              config:authForm[key]
            });
        }

        let form =formElements.map(formElement=>{
            return (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                changed={(event)=>inputChangedHandler(event,formElement.id)}
                touched={formElement.config.touched}
                />
            );
        })
        if(props.loading){
            form=(<Spinner/>)
        }

        let errorMessage=null;
        if(props.error){
            errorMessage=(<p>
                {props.error.data.error.message}
            </p>);
        }

        let authRedirect=null;
        if(props.isAuthenticated)
        {
            authRedirect=<Redirect to={props.authRedirectPath}/>
        }

        return (
            <div className={CssClasses.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={switchAuthModeHandler}
                btnType='Danger' >SWITCH TO {isSignup ? 'SIGNIN' :'SIGNUP'}</Button>
                
            </div>
        );
    
}

const mapStateToProps=state=>{
    return {
        loading : state.auth.loading,
        error :state.auth.error,
        isAuthenticated :state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath

    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Auth);
