import React from 'react';
import CssClass from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger=(props)=>{
    
    let transformIngredient=Object.keys(props.ingredient)
    .map(igKey=>{
        return [...Array(props.ingredient[igKey])].map((_,i)=>{
           return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)

    });

    if(transformIngredient.length===0)
    {
        transformIngredient=<p>Please Add something</p>
    }
    
    console.log(transformIngredient);
    
    return(
        <div className={CssClass.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformIngredient}
        <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;