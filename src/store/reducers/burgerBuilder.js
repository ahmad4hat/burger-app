import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const INGREDIENT_PRICE={
    salad :50,
    bacon:70,
    cheese:80,
    meat :90 
};

const initialState={
    ingredients:null,
    totalPrice:100,
    error:false,
    building :false

}

const addIngredient=(state,action)=>{
    const updatedIngredientForAdd={[action.ingredientName]: state.ingredients[action.ingredientName] +  1};
            const UpdatedIngredientsForAdd=updateObject(state.ingredients,updatedIngredientForAdd);
            const updatedStateForAdd={
                ingredients:UpdatedIngredientsForAdd,
                totalPrice:state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building:true

            }
            
    return updateObject(state,updatedStateForAdd);
};

const removeIngredient=(state,action)=>{
    const updatedIngredientForRemove={[action.ingredientName]: state.ingredients[action.ingredientName] -  1};
            const UpdatedIngredientsForRemove=updateObject(state.ingredients,updatedIngredientForRemove);
            const updatedStateForRemove={
                ingredients:UpdatedIngredientsForRemove,
                totalPrice:state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                building:true

            }
            
    return updateObject(state,updatedStateForRemove);
}

const setIngredient=(state,action)=>{
    return updateObject(state,{
        ingredients :{
            salad :action.ingredients.salad,
            bacon :action.ingredients.bacon,
            cheese :action.ingredients.cheese,
            meat:action.ingredients.meat
        },
        totalPrice:100,
        error:false,
        building :false
    })
}

const fetchIngredientFailed=(state,action)=>{
    return updateObject(state,{ ...state,error :true})
}



const reducer=(state=initialState,action )=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT             :return addIngredient(state,action);        
        case actionTypes.REMOVE_INGREDIENT          :return removeIngredient(state,action)
        case actionTypes.SET_INGREDIENTS            :return setIngredient(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED   :return fetchIngredientFailed(state,action);
        default                                     :return state;
           
    }
}


export default reducer;