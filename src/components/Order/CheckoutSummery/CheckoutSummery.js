import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import CssClass from './CheckoutSummery.module.css';

const CheckoutSummery = (props) => {
    return (
        <div className={CssClass.CheckoutSummery}>
            <h1>Hope it tastes well</h1>
            <div style={{ width:"100%"}}>
                <Burger ingredients={props.ingredients}/>
                <Button 
                    btnType="Danger"
                    clicked={props.onCheckoutCancelled} >CANCEL
                </Button>
                <Button 
                    btnType="Success"
                    clicked={props.onCheckoutContinued}>CONTINUE
                </Button>
            </div>
        </div>
    );
}

export default CheckoutSummery;
