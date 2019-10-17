import React from 'react';
import Burger from '../../components/Burger/Burger';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order';

const INGREDIENT_PRICE={
            salad :50,
            bacon:70,
            cheese:80,
            meat :90 
};


class BurgerBuilder extends React.Component
{

    state={
        ingredients:null,
        totalPrice:100,
        purchasable :false,
        purchasing :false,
        loading :false,
        error:null
    };

    componentDidMount(){
        axios.get('https://react-my-burger-d4782.firebaseio.com/ingredients.json')
            .then(responce =>{
                this.setState({ingredients:responce.data})

            })
            .catch(error=>{
                this.setState({error:String(error)})
            });
    }

    updarePurchaseState(ingredients)
    {
        // const ingredients={
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map((igKeys)=>{
            return ingredients[igKeys];
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
        // alert("you continue");
        //console.log("yu clicked the continue button");
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            price:this.state.price,
            customer :{
                name : 'Ahmad Farhat',
                address:{
                    street :'sadek road',
                    zip : '1212',
                    country : 'Bangladesh'
                },
                email : 'AhmadIsABoss@gmail.com'
            },
            deliveryMethod:'fastest'
        };
        
        axios.post('/order.json',order)
        .then(responce=> this.setState({loading:false ,purchasing:false}))
        .catch(error=>this.setState({loading:false ,purchasing:false}));

    }

    

    addIngredientHandler=(type)=>{
        const oldcount =this.state.ingredients[type];
        const updatedCount=oldcount+1;
        const ingredients={
            ...this.state.ingredients
        }
        ingredients[type]=updatedCount;
        const totalPrice=INGREDIENT_PRICE[type] + this.state.totalPrice;
        this.setState({ingredients,totalPrice});
        this.updarePurchaseState(ingredients);

    }
    
    removeIngredientHandler=(type)=>{
        const oldcount =this.state.ingredients[type];    
        if (oldcount <=0 )
        {
            return ;
        }
        const updatedCount=oldcount-1;
        const ingredients={
            ...this.state.ingredients
        }
        ingredients[type]=updatedCount;
        const totalPrice=this.state.totalPrice-INGREDIENT_PRICE[type];
        this.setState({ingredients,totalPrice});
        this.updarePurchaseState(ingredients);
    }
    render()
    {

        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]= (disabledInfo[key]<=0);

        }
        let orderSummery=null;
       
       
        let burger=this.state.error ? <p> Ingredient can't load</p>:   <Spinner/>

        if(this.state.ingredients)
        {
            burger=(
                    <React.Fragment>
                            <Burger ingredients={this.state.ingredients}></Burger>    
                            <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            ordered={this.purchasableHandler}
                            purchasable={this.state.purchasable}/>
                    </React.Fragment>
                    );
            
            
            orderSummery= <OrderSummery 
                            price={this.state.totalPrice}
                            ingredients={this.state.ingredients}
                            purchasedCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            ></OrderSummery>
            
        }

        if(this.state.loading)
        {
           orderSummery= <Spinner/>;
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

export default withErrorHandler(BurgerBuilder,axios);