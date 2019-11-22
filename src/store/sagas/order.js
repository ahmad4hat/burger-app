import {put,delay} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import * as actionTypes from './../actions/actionTypes';
import * as actions from './../actions/index'
import axios from './../../axios-order';




export function* purchaseBurgerSaga(action){
    
       
    try{
        yield put(actions.purchaseBurgerStart());
        const responce= yield axios.post('/orders.json?auth='+action.token, action.orderData);   
        yield put(actions.purchaseBurgerSuccess(responce.data.name,action.orderData));
    }catch(error){
        yield put (actions.purchaseBurgerFailed(error));
        console.log(error);
    } 
        
              
}

export function* fetchOrdersSaga(action){
        
        yield put(actions.fetchOrdersStart());
        const  queryParams =yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        
        try{
        const res=yield axios.get('/orders.json'+queryParams)
            const fetchOrders=[];
            for(let key in res.data)
            {
                fetchOrders.push({
                    ...res.data[key],
                    id:key 
                })
            }
            yield put(actions.fetchOrdersSuccess(fetchOrders))

        }catch(err){
            yield put(actions.fetchOrdersFail(err))
        }
       
} 
