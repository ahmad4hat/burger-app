import React, { Component } from 'react';
import {connect} from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import {Route ,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const Checkout=props=>  {
  


    const checkoutContinuedHandler=()=>{
        props.history.replace('/checkout/contact-data');
    }
    const checkoutCancelledHandler=()=>{
        props.history.goBack();
    }

  

        let summery =(<Redirect to="/"/>)
        if(props.ings){
            const purchaseRedirect=props.purchased ? <Redirect to="/"/>:null;
            summery=(
            <div>
                {purchaseRedirect}
                 <CheckoutSummery ingredients={props.ings} 
                onCheckoutContinued={checkoutContinuedHandler}
                onCheckoutCancelled={checkoutCancelledHandler}
                />
                
                <Route path={props.match.path+'/contact-data'}
                component={ContactData} />
            </div>
                )
        }
        
        return (
            <div>
                {summery}
              
            </div>
        )
 
}


const mapStareToProps = state=>{
    return {
        ings: state.burgerBuilder.ingredients,
        purchased :state.order.purchased

    }
}

const mapDispatchToProps=dispatch=>{
    return{
    }
}

export default connect(mapStareToProps,mapDispatchToProps) (Checkout);
