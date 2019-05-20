import { login, INITIAL_STATE } from './login-reducer';
import { loginTypes } from '../constants/login-types';

describe('Reducers Login', () => {
  it('Debe Despachar LOGIN_REQUEST', () => {
    // expect(login(INITIAL_STATE,{type: loginTypes.LOGIN_REQUEST})).toMatchSnapshot()
    expect(login(INITIAL_STATE, { type: loginTypes.LOGIN_REQUEST })).toEqual({
      loggingIn: true,
      user: undefined,
    });
  });
});
