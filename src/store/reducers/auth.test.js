import reducer from './auth';

import * as actionTypes from './../actions/actionTypes';


describe('auth reducer test', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token : null,
            userId:null,
            error:null,
            loading :false,
            authRedirectPath :'/'

        });
    });

    it('should return token storing', () => {
        expect(reducer({
            token : null,
            userId:null,
            error:null,
            loading :false,
            authRedirectPath :'/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId:"someID"
        }
        )).toEqual({
            token : "some-token",
            userId:"someID",
            error:null,
            loading :false,
            authRedirectPath :'/'
        });
    });
    
});
