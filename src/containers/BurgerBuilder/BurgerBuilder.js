import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';



export const BurgerBuilder =props=>{

    const [purchasing,setPurchasing]= useState(false);

    useEffect(()=>{
        props.onInitIngredients();
    },[])

    const updatePurchaseState=(ingredients)=>{
        // const ingredients={
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map((igKeys)=>{
            return ingredients[igKeys];
        }).reduce((sum,el)=>{
            return sum + el;
        },0)

        return sum>0 ;
    }

    const purchasableHandler=()=>{
        if(props.isAuthenticated)
            {
                setPurchasing(true);
            } else {
                props.onSetAuthRedirectPath('/checkout');
                props.history.push('/auth');
            }
        }
       
    
    const purchaseCancelHandler=()=>{
        setPurchasing(false);

    }
    const purchaseContinueHandler=()=>{
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    
  

        const disabledInfo={
            ...props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= (disabledInfo[key]<=0);

        }
        let orderSummery=null;
       
       
        let burger=props.error ? <p> Ingredient can't load</p>:   <Spinner/>

        if(props.ings)
        {
            burger=(
                    <React.Fragment>
                            <Burger ingredients={props.ings}></Burger>    
                            <BuildControls
                            ingredientAdded={props.onIngredientAdded}
                            ingredientRemoved={props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={props.price}
                            ordered={purchasableHandler}
                            isAuth={props.isAuthenticated}
                            purchasable={updatePurchaseState(props.ings)}/>
                    </React.Fragment>
                    );
            
            
            orderSummery= <OrderSummery 
                            price={props.price}
                            ingredients={props.ings}
                            purchasedCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            ></OrderSummery>
            
        }


        return (
            <React.Fragment>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                   {orderSummery}
                </Modal>
                {burger}
                
            </React.Fragment>
        );
  

}
const mapStateToProps= state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated :state.auth.token !== null


    }
}

const mapDispathToProps= dispatch=>{
    return {
       onIngredientAdded: (ingredientName)=>dispatch(actions.addIngredient(ingredientName)),
       onIngredientRemoved: (ingredientName)=>dispatch(actions.removeIngredient(ingredientName)),
       onInitIngredients :()=>dispatch(actions.initIngredient()),
       onInitPurchase :()=>dispatch(actions.purchaseInit()),
       onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }

}

export default connect(mapStateToProps,mapDispathToProps) (withErrorHandler(BurgerBuilder,axios));