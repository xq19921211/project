/**
 * Created by xu.long on 2018/5/16.
 */
import { createAction, handleActions, Action } from 'redux-actions';
import {
  COMMODITY_CLASSIFY,
  COMMODITY_CLASSIFY_SUCCESS,
  COMMODITY_CLASSIFY_ERROR,
  COMMODITY_CLASSIFY_FAILED,
} from './constant';

import { EC_COMMODITY_CLASSIFY } from '../../../../constant';
import { clone } from '../../../../util/util';

export const name = EC_COMMODITY_CLASSIFY;

export const commodityClassifyReducer = handleActions(
  {
    [COMMODITY_CLASSIFY_SUCCESS]: (state, action) => {
      console.log(
        'commodityClassifyReducer COMMODITY_CLASSIFY_SUCCESS success action: ' +
          JSON.stringify(action),
      );
      let temp = clone(action.payload.data.data);
      switch (action.payload.type) {
        case '全部':
          temp.dataSource.unshift({
            cat_id: '',
            cat_name: '--全部--',
          });
          break;
        case '一级分类':
          temp.dataSource.unshift({
            cat_id: '0',
            cat_name: '--作为一级分类--',
          });
          break;
      }
      return Object.assign({}, state, {
        data: temp,
      });
    },
  },
  {
    data: {
      current: 1,
      dataSource: [],
      total: 0,
    },
  },
);
