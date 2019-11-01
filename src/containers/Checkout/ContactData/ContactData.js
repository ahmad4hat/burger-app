import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import CssClasses from './ContactData.module.css'

export default class ContactData extends Component {
    
    state={
        name:' ',
        email : ' ',
        address :{
            street :'',
            postalCode :''
        }

    }
    render() {

        return (
            <div className={CssClasses.ContactData}>
                <h4>Enter the Contact Data</h4>
                <form>
                    <input className={CssClasses.Input} type="text" name = "name" placeholder="Your Name"/>
                    <input className={CssClasses.Input} type="email" name = "email" placeholder="Your Email"/>
                    <input className={CssClasses.Input} type="text" name = "street" placeholder="Street"/>
                    <input className={CssClasses.Input} type="text" name = "postal" placeholder="Postal Code"/>
                    <Button btnType ="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}
