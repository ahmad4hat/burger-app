import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import CssClasses from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
    
    state={
        name:' ',
        email : ' ',
        address :{
            street :'',
            postalCode :''
        },
        loading:false

    }

    orderHandler=(event)=>{
        event.preventDefault();
       console.log("yu clicked the continue button");
        this.setState({loading:true});
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
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
        
        axios.post('/orders.json',order)
        .then(responce=> {
            this.setState({loading:false})
            this.props.history.push('/');
        })
        .catch(error=>this.setState({loading:false}));

    }
    render() {
        

        let form=(<form>
            <Input inputtype="input" name = "name" placeholder="Your Name"/>
            <Input inputtype="input" name = "email" placeholder="Your Email"/>
            <Input inputtype="input" name = "street" placeholder="Street"/>
            <Input inputtype="input" name = "postal" placeholder="Postal Code"/>
            <Button btnType ="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading)
        {
            form=(<Spinner/>);
        }

        return (
            <div className={CssClasses.ContactData}>
                <h4>Enter the Contact Data</h4>
                {form}
            </div>
        )
    }
}
