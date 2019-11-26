import React,{useState} from 'react'
import CssClass from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

const Layout=props=>{
    
    const [sideDrawerIsVisiable,setSideDrawerIsVisiable]=useState(false);
    
   
    const sideDrawerClosedHandler=()=>{
        setSideDrawerIsVisiable(false);
    }

    const sideDrawerOpenHandler=()=>{
        setSideDrawerIsVisiable(!sideDrawerIsVisiable);
    }


    return(
        <React.Fragment>
            <Toolbar 
            isAuth={props.isAuthenticated}
            sideDrawerOpen={sideDrawerOpenHandler
            }/>
            <SideDrawer 
            isAuth={props.isAuthenticated}
            open={sideDrawerIsVisiable} closed={sideDrawerClosedHandler}/>

            <main className={CssClass.Content}>
                {props.children}
            </main>

        </React.Fragment>
    );

}

const mapStateToProps=(state)=>{
    return {
        isAuthenticated:state.auth.token !==null
    }
};




export default connect(mapStateToProps)(Layout);