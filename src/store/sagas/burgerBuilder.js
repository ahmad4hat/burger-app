import {put,delay} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import * as actionTypes from './../actions/actionTypes';
import * as actions from './../actions/index'
import axios from 'axios';



export function* initIngredientSaga(action){
   
        try {
        const responce =yield axios.get('https://react-my-burger-d4782.firebaseio.com/ingredients.json')
        yield put(actions.setIngredient(responce.data));
        }catch(error){ 
            yield put(actions.fetchIngredientsFailed());
           
        }
        

}