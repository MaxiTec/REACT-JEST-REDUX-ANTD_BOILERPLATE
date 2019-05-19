import login from './login-reducer';
import {loginTypes} from '../constants/login-types'
import {INITIAL_STATE} from './login-reducer'
describe('Reducers Login', () => {
    it('Debe Despachar LOGIN_REQUEST', () => {
        // expect(login(INITIAL_STATE,{type: loginTypes.LOGIN_REQUEST})).toMatchSnapshot()
        expect(login(INITIAL_STATE,{type: loginTypes.LOGIN_REQUEST})).toEqual({"loggingIn": true, "user": undefined});
    })
    // it('Debe Despachar LOGIN_SUCCESS', () => {
    //     const successAction = {
    //         type: loginTypes.LOGIN_SUCCESS,
    //         payload: 'test',
    //       };
    //       expect(login(INITIAL_STATE,successAction)).toEqual({"loggingIn": true, "user": undefined});
    // })
});
