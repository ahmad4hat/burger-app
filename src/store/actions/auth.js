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
        idToken,
        userId
        
    };
};

export const authFail=(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    return {
         type :actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
             dispatch(logout());
        },expirationTime*1000);

    }
}

export const setAuthRedirectPath=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path
    }

}


export const auth =(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxcRFaJ1M8zMeWC0qxszFCN-p1H1dvODo";
        if(!isSignUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxcRFaJ1M8zMeWC0qxszFCN-p1H1dvODo"
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
            console.log(response.data.expiresIn);
        })
        .catch(
            err=>{console.log(err);
            dispatch(authFail(err.response))
            }
        )

    };
};