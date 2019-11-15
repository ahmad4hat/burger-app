import {BurgerBuilder} from './BurgerBuilder';
import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import buildControls from '../../components/Burger/BuildControls/BuildControls';


configure({adapter:new Adapter()});


describe('<BurgerBuilder/>', () => {
    
    
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder ings={{salad:0}} onInitIngredients={()=>{}}/>);
    })
    
    it('should render two <NavigationItem/> elements if not authenticated', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    
    
    // let wrapper;
    // beforeEach(()=>{
    //     wrapper=shallow(<BurgerBuilder/>);
    // })

    // it('should render buildcontrolls when reciving ingredients', () => {
    //     //wrapper.setProps({ing:true});
    // //    wrapper=shallow(<BurgerBuilder ings={{salad:0}}/>);

    //     expect(wrapper.find(BuildControls)).toHaveLength(1);
    // });
    
});
