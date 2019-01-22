import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
   it('should return initial state', () => {
       expect(reducer(undefined, {})).toEqual({
           userId: null,
           token: null,
           error: null,
           loading: false,
           authRedirectPath: '/'
       });
   });

    it('should return token upon authorization', () => {
        expect(reducer({
            userId: null,
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
            }, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'test-token',
                userId: 'test-userId'
            })).toEqual({
                userId: 'test-userId',
                token: 'test-token',
                error: null,
                loading: false,
                authRedirectPath: '/'
        });
    });
});