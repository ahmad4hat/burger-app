import React from 'react'
import Burger from '../../components/Burger/Burger'
import  BuildControls from '../../components/Burger/BuildControls/BuildControls'
import BuildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl'

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
        totalPrice:100
    };

    addIngredientHandler=(type)=>{
        const oldcount =this.state.ingredient[type];
        const updatedCount=oldcount+1;
        const ingredient={
            ...this.state.ingredient
        }
        ingredient[type]=updatedCount;
        const totalPrice=INGREDIENT_PRICE[type] + this.state.totalPrice;
        this.setState({ingredient,totalPrice});

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
                <Burger ingredient={this.state.ingredient}></Burger>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                />
            </React.Fragment>
        );
    }

}

export default BurgerBuilder;