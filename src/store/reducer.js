import * as actionTypes from './actions';

const INGREDIENT_PRICE={
    salad :50,
    bacon:70,
    cheese:80,
    meat :90 
};

const initialState={
    ingredients:{
        salad :0,
        bacon :0,
        cheese :0,
        meat : 0
    },
    totalPrice:100
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
    
        default:
            return state;
            break;
    }
}


export default reducer;