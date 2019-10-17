import React from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import CssClass from './App.module.css';

class App extends React.Component {


  render()
  {
    
  const a=[];
  a.push(CssClass.red);
  a.push(CssClass.bold);
  console.log(a);
  return (
      <div>
        <Layout>
          
          <BurgerBuilder/>
          
         
        </Layout>
      </div>
  );
  }
}

export default App;
