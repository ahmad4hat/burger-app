import React from 'react';
import {connect} from 'react-redux'
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Cheakout from './containers/Checkout/Checkout';
import {Route ,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

import CssClass from './App.module.css';


class App extends React.Component {

  
  componentDidMount (){
    this.props.onTryAuthSignUp();
  }


  render()
  {
    
  let routes=(
    <Switch>
    
    <Route path="/auth" component={Auth}/>
    <Route path="/" exact component={BurgerBuilder}/>
    <Redirect to="/"/>
    </Switch>);
  
    if(this.props.isAuthenticated){
    routes=(
      <Switch>
            <Route path="/checkout" component={Cheakout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
         >
            <Redirect to="/"/>
      </Switch>);
    }
  return (
      <div>
        <Layout>
          
          {routes}    
         
        </Layout>
      </div>
  );
  }
}

const mapStatetoProps=state=>{
  return {
    isAuthenticated : state.auth.token !==null 
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onTryAuthSignUp:()=>dispatch(actions.authCheckState())
  }
}

export default withRouter( connect(mapStatetoProps,mapDispatchToProps) (App));
