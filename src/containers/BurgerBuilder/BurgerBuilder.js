import React from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';
import * as burgerBuilderActions from '../../store/actions/index';



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
        this.setState({purchasing:true});
    }
    
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});

    }
    purchaseContinueHandler=()=>{
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



        //console.log(disabledInfo);
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
        error:state.burgerBuilder.error


    }
}

const mapDispathToProps= dispath=>{
    return {
       onIngredientAdded: (ingredientName)=>dispath(burgerBuilderActions.addIngredient(ingredientName)),
       onIngredientRemoved: (ingredientName)=>dispath(burgerBuilderActions.removeIngredient(ingredientName)),
       onInitIngredients :()=>dispath(burgerBuilderActions.initIngredient())
    }

}

export default connect(mapStateToProps,mapDispathToProps) (withErrorHandler(BurgerBuilder,axios));