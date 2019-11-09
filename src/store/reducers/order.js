import * as actiontypes from '../actions/actionTypes'

const initialState ={
    orders:[],
    loading :false


}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        
        
        case actiontypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading:true
            }
            break;
        case actiontypes.PURCHASE_BURGER_SUCCESS:
        const newOrder={
            ...action.orderData,
            id:action.orderId
        } 
        
            return{
            ...state,
            loading:false,
            order:state.orders.concat(newOrder)    
            }
            
            break;
        case actiontypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false
            }
            
            break;
        
        default:
            return state;
            break;
    }

}


export default reducer;