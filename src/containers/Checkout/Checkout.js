import React, { Component } from 'react';
import {connect} from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummery ingredients={this.props.ings} 
                onCheckoutContinued={this.checkoutContinuedHandler}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                />
                <Route path={this.props.match.path+'/contact-data'}
                component={ContactData} />
            </div>
        )
    }
}


const mapStareToProps = state=>{
    return {
        ings: state.ingredients

    }
}

export default connect(mapStareToProps) (Checkout);
