import React from 'react'
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends React.Component
{

    state={
        ingredient:{
            salad :1,
            bacon:1,
            cheese:2,
            meat :2 
        }
    }
    render()
    {
        return (
            <React.Fragment>
                <Burger ingredient={this.state.ingredient}></Burger>
                <div>Burger Control</div>
            </React.Fragment>
        );
    }

}

export default BurgerBuilder;