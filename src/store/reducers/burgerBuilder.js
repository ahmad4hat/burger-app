import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE={
    salad :50,
    bacon:70,
    cheese:80,
    meat :90 
};

const initialState={
    ingredients:null,
    totalPrice:100,
    error:false

}

const reducer=(state=initialState,action )=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] +  1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
            break;
        case actionTypes.REMOVE_INGREDIENT:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice:state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
                }
            break;
        
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients :{
                    salad :action.ingredients.salad,
                    bacon :action.ingredients.bacon,
                    cheese :action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                error:false
            }
            break;
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error :true
            }
            break;
        default:
            return state;
            break;
    }
}


export default reducer;