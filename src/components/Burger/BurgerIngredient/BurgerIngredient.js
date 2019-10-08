import React from 'react'
import propTypes from 'prop-types';
import CssClass from './BurgerIngredient/BurgerIngredinet.module.css'

class BurgerIngredient extends React.Component
{
    render(){
        let ingredient =null;

        switch(this.props.type)
        {
            case ('bread-bottom'):
                ingredient=<div className={CssClass.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient=<div className={CssClass.BreadTop}>
                    <div className={CssClass.Seeds1}></div>
                    <div className={CssClass.Seeds2}></div>
                </div>
                ;
                break;
            case ('meat'):
                ingredient=<div className={CssClass.Meat}></div>;
                break;
            case ('cheese'):
                ingredient=<div className={CssClass.Cheese}></div>;
                break;
            case ('bacon'):
                ingredient=<div className={CssClass.Bacon}></div>;
                break;
            case ('salad'):
                ingredient=<div className={CssClass.Salad}></div>;
                break;
            default:
                ingredient=null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes={
    type:propTypes.string.isRequired

}

export default BurgerIngredient