import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';



export const purchaseBurgerSuccess=(id,orderData)=>{
    return {
        type :actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData :orderData


    }
}

export const purchaseBurgerFailed=(error)=>{
    return {
        type :actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(responce => {
            console.log(responce.data);
            dispatch(purchaseBurgerSuccess(responce.data.name,orderData));
        }).catch(error => { 
            dispatch(purchaseBurgerFailed(error));
        });
    }
}

export const purchaseInit=()=>{
    return {
        type :actionTypes.PURCHASE_INIT
    }
}