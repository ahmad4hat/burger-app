import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            ingredients[param[0]] = +[param[1]];
            
        }
        // console.log(ingredients);
        console.log("this is the stuff");
        const a= Object.keys(ingredients).sort().toString();
        const b=Object.keys(this.state.ingredients).sort().toString();
        console.log(a===b);



        if(a===b){
        this.setState({ingredients:ingredients});
        }
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
                <Route path={this.props.match.path+'/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;
