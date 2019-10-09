import React from 'react';

const OrderSummery = (props) => {
    const ingredientSummery= Object.keys(props.ingredients)
    .map(igkeys=> {
        return (
            <li key={igkeys}>
                <span style={{textTransform:'capitalize'}}>{igkeys}</span>:{props.ingredients[igkeys]}
            </li>);
    });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummery}
            </ul>

            <p>Continue To Cheakout</p>
        </React.Fragment>
    );
}

export default OrderSummery;
