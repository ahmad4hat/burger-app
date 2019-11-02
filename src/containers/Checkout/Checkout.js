import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:0
    }

    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query.entries()){
            if(param[0]==='price')
            {
                price=+param[1];
            }
            else{
                ingredients[param[0]] = +[param[1]];
            }
            
            
        }
      
        const a= Object.keys(ingredients).sort().toString();
        const b=Object.keys(this.state.ingredients).sort().toString();
       



        if(a===b){
        this.setState({ingredients:ingredients ,totalPrice:price} );
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
                <Route path={this.props.match.path+'/contact-data'}
                render={(props)=>(<ContactData ingredients={this.state.ingredients}  price ={this.state.totalPrice} {...props}/>)} />
            </div>
        )
    }
}

export default Checkout;
