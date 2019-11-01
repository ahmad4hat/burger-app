import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'

export default class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            cheese:1,
            meat :1,
            bacon :1
        }
    }

    componentDidMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            ingredients[param[0]] = +[param[1]];
            
        }
         this.setState({ingredients:ingredients});
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummery ingredients={this.state.ingredients} 
                onCheckoutContinued={this.checkoutContinuedHandler}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                />
            </div>
        )
    }
}
