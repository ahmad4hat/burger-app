import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return {
        type :actionTypes.AUTH_START
    }
};


export const authSuccess=(idToken,userId)=>{
    return {
        type :actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
        
    };
};

export const authFail=(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
         type :actionTypes.AUTH_INIT_LOGOUT
    }
}
export const logoutSuccess=()=>{
    return{type :actionTypes.AUTH_LOGOUT};
}


export const checkAuthTimeout=(expirationTime)=>{
    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime
        
    }
}

export const setAuthRedirectPath=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path
    }

}



export const auth =(email,password,isSignUp)=>{
    return {
        type : actionTypes.AUTH_USER,
        email,
        password,
        isSignUp

    }
};

export const authCheckState=()=>{
   return {
       type:actionTypes.AUTH_CHECK_STATE
   }
}