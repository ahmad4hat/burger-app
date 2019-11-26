import React,{Suspense,useEffect} from 'react';
import {connect} from 'react-redux'
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route ,Switch,withRouter,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Auth=React.lazy(()=>import('./containers/Auth/Auth'));
const Orders=React.lazy(()=>import('./containers/Orders/Orders'));
const Checkout=React.lazy(()=>import('./containers/Checkout/Checkout'));


const App=props=>{

  useEffect(()=>{
    props.onTryAuthSignUp();
  },[])

  // componentDidMount (){
    
  // }


 
    
  let routes=(
    <Switch>
    
    <Route path="/auth" render={(props)=><Suspense fallback={<Spinner></Spinner>}><Auth {...props}/></Suspense>}/>  
    <Route path="/" exact component={BurgerBuilder}/>
    <Redirect to="/"/>
    </Switch>);
  
    if(props.isAuthenticated){
    routes=(
      <Switch>
            <Route path="/checkout" render={(props)=><Suspense fallback={<Spinner></Spinner>}><Checkout {...props} /></Suspense>}/>
            <Route path="/orders" render={(props)=><Suspense fallback={<Spinner></Spinner>}><Orders {...props}/></Suspense>}/>
            <Route path="/auth" render={(props)=><Suspense fallback={<Spinner></Spinner>}><Auth {...props} /></Suspense>}/>     
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
