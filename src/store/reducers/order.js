import * as actiontypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility';

const initialState ={
    orders:[],
    loading :false,
    purchased:false



}

const purchaseInit=(state,action)=>{
    return updateObject(state,{ purchased:false})
}
const purchasedBurgerStart=(state,action)=>{
    return updateObject(state,{loading:true})
}
const purchasedBurgerSuccess=(state,action)=>{
    const newOrder=updateObject(action.orderData,{id:action.orderId})
         
    return updateObject(state,{  loading:false,
        purchased:true,
        order:state.orders.concat(newOrder)})
    
}
const purchasedBurgerFail=(state,action)=>{
    return updateObject(state,{loading:false});
}
const fetchOrdersStart=(state,action)=>{
    return updateObject(state,{loading:true});
}
const fetchOrdersSucess=(state,action)=>{
    return updateObject(state,{orders:action.orders,
        loading:false})
    
}
const fetchOrdersFail=(state,action)=>{
    return updateObject(state,{ loading:false});
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actiontypes.PURCHASE_INIT:return purchaseInit(state,action);
           
        case actiontypes.PURCHASE_BURGER_START      :return purchasedBurgerStart(state,action);  
        case actiontypes.PURCHASE_BURGER_SUCCESS    :return purchasedBurgerSuccess(state,action);
        case actiontypes.PURCHASE_BURGER_FAIL       :return purchasedBurgerFail(state,action); 
        case actiontypes.FETCH_ORDERS_START         :return fetchOrdersStart(state,action);
        case actiontypes.FETCH_ORDERS_SUCCESS       :return fetchOrdersSucess(state,action)
        case actiontypes.FETCH_ORDERS_FAIL          :return fetchOrdersFail(state,action)
        default                                     :return state;
    }

}


export default reducer;