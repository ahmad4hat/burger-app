import React from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends React.Component
{

    state={
        purchasing :false,
      
    };

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients)
    {
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

    purchasableHandler=()=>{
        if(this.props.isAuthenticated)
            {
                this.setState({purchasing:true});
            } else {
                this.props.onSetAuthRedirectPath('/checkout');
                this.props.history.push('/auth');
            }
        }
       
    
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});

    }
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    
    render()
    {

        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= (disabledInfo[key]<=0);

        }
        let orderSummery=null;
       
       
        let burger=this.props.error ? <p> Ingredient can't load</p>:   <Spinner/>

        if(this.props.ings)
        {
            burger=(
                    <React.Fragment>
                            <Burger ingredients={this.props.ings}></Burger>    
                            <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            ordered={this.purchasableHandler}
                            isAuth={this.props.isAuthenticated}
                            purchasable={this.updatePurchaseState(this.props.ings)}/>
                    </React.Fragment>
                    );
            
            
            orderSummery= <OrderSummery 
                            price={this.props.price}
                            ingredients={this.props.ings}
                            purchasedCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            ></OrderSummery>
            
        }


        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummery}
                </Modal>
                {burger}
                
            </React.Fragment>
        );
    }

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