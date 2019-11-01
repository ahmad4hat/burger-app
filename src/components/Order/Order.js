import React from 'react';
import CssClass from './Order.module.css';

const Order = (props) => {
    return (
        <div className={CssClass.Order}>
            <p>Ingredient salad : (1)</p>
            <p> Price :<strong>Taka 500 </strong></p>
        </div>
    );
}

export default Order;
