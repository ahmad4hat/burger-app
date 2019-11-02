import React from 'react';
import Button from '../../UI/Button/Button'

class OrderSummery extends React.Component  {
    // can be a functional component 
    componentDidUpdate()
    {
    }

    render(){
    const ingredientSummery= Object.keys(this.props.ingredients)
    .map(igkeys=> {
        return (
            <li key={igkeys}>
                <span style={{textTransform:'capitalize'}}>{igkeys}</span>:{this.props.ingredients[igkeys]}
            </li>);
    });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total price :{this.props.price.toFixed(2)}</strong></p>

            <p>Continue To Cheakout</p>
            <Button btnType="Danger" clicked={this.props.purchasedCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button> 
        </React.Fragment>
    );
    }
}

export default OrderSummery;
