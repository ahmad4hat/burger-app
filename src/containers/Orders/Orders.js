import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component {
    
    componentDidMount(){
        this.props.onFetchOrder(this.props.token,this.props.userId);
    }
    render() {
        let orders=<Spinner/>
        if(!this.props.loading){
            orders= this.props.orders.map(order=>{
                return( <Order 
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price}/>);
             });
        }
        return (
            <div>
               { orders}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token :state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToprops=dispatch=>{
    return {
        onFetchOrder:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
};

export default connect(mapStateToProps,mapDispatchToprops)(withErrorHandler(Orders,axios));
