import React from 'react';
import Burger from '../../components/Burger/Burger';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'

const INGREDIENT_PRICE={
            salad :50,
            bacon:70,
            cheese:80,
            meat :90 
};


class BurgerBuilder extends React.Component
{

    state={
        ingredient:{
            salad :0,
            bacon:0,
            cheese:0,
            meat :0 
        },
        totalPrice:100,
        purchasable :false,
        purchasing :false
    };

    updarePurchaseState(ingredient)
    {
        // const ingredient={
        //     ...this.state.ingredient
        // };
        const sum = Object.keys(ingredient).map((igKeys)=>{
            return ingredient[igKeys];
        }).reduce((sum,el)=>{
            return sum + el;
        },0)

        this.setState({
            purchasable : sum>0 
        })
    }

    purchasableHandler=()=>{
        this.setState({purchasing:true});
    }
    
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});

    }
    purchaseContinueHandler=()=>{
        alert("you continue");
        console.log("yu clicked the continue button");

    }

    

    addIngredientHandler=(type)=>{
        const oldcount =this.state.ingredient[type];
        const updatedCount=oldcount+1;
        const ingredient={
            ...this.state.ingredient
        }
        ingredient[type]=updatedCount;
        const totalPrice=INGREDIENT_PRICE[type] + this.state.totalPrice;
        this.setState({ingredient,totalPrice});
        this.updarePurchaseState(ingredient);

    }
    
    removeIngredientHandler=(type)=>{
        const oldcount =this.state.ingredient[type];    
        if (oldcount <=0 )
        {
            return ;
        }
        const updatedCount=oldcount-1;
        const ingredient={
            ...this.state.ingredient
        }
        ingredient[type]=updatedCount;
        const totalPrice=this.state.totalPrice-INGREDIENT_PRICE[type];
        this.setState({ingredient,totalPrice});
        this.updarePurchaseState(ingredient);
    }
    render()
    {

        const disabledInfo={
            ...this.state.ingredient
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= (disabledInfo[key]<=0);

        }
        //console.log(disabledInfo);
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummery 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredient}
                    purchasedCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ></OrderSummery>
                </Modal>
                <Burger ingredient={this.state.ingredient}></Burger>
                
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                ordered={this.purchasableHandler}
                purchasable={this.state.purchasable}
                />
            </React.Fragment>
        );
    }

}

export default BurgerBuilder;