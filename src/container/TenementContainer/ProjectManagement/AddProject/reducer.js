import * as types from './constant';

import { Action, createAction, handleActions } from 'redux-actions';

import { EC_ADD_PROJECT } from '../../../../constant';

export const name = EC_ADD_PROJECT;

export const addProjectReducer = handleActions({}, {});
