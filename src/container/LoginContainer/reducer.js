/**
 * Created by xu.long on 26/03/2018.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  // LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from './constant';

import { EC_LOGIN } from '../../constant';

export const name = EC_LOGIN;

export const loginReducer = handleActions(
  {
    // [LOGIN]: (state, action) => {
    //     console.log('loginReducer login action: ' + JSON.stringify(action));
    //     return Object.assign({}, state, {
    //         status: {}
    //     });
    // },
    [LOGIN_SUCCESS]: (state, action) => {
      console.log(
        'loginReducer LOGIN_SUCCESS action: ' + JSON.stringify(action),
      );
      return Object.assign({}, state, {
        status: action.payload,
      });
    },
    [LOGOUT_SUCCESS]: (state, action) => {
      console.log(
        'loginReducer LOGOUT_SUCCESS action: ' + JSON.stringify(action),
      );
      return Object.assign({}, state, {
        status: action.payload,
      });
    },
  },
  { status: {} },
);
