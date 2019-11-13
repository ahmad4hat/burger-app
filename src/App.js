import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Cheakout from './containers/Checkout/Checkout';
import {Route ,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'

import CssClass from './App.module.css';


class App extends React.Component {


  render()
  {
    
  const a=[];
  a.push(CssClass.red);
  a.push(CssClass.bold);
  return (
      <div>
        <Layout>
          
          {/* <BurgerBuilder/>
          <Cheakout/> */}
          <Switch>
            <Route path="/checkout" component={Cheakout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>

          </Switch>
          
         
        </Layout>
      </div>
  );
  }
}

export default App;
