/**
 * Created by xu.long on 2018/6/23.
 */
import { handleActions } from 'redux-actions';
import { EC_HOME_PICTURE_MANAGEMENT } from '../../../../constant';
import { clone } from '../../../../util/util';
import {
  HOME_PICTURE_MANAGEMENT_SUCCESS,
  MODIFY_LIST_STATUS_SUCCESS,
} from './constant';

export const name = EC_HOME_PICTURE_MANAGEMENT;

export const homePictureManagementReducer = handleActions(
  {
    [HOME_PICTURE_MANAGEMENT_SUCCESS]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data,
      });
    },
    [MODIFY_LIST_STATUS_SUCCESS]: (state, action) => {
      let temp = clone(state.data.dataSource);
      temp[action.payload.record.key].supStatus = action.payload.record.status;
      let obj = Object.assign({}, state.data, {
        dataSource: temp,
      });
      return Object.assign({}, state, {
        data: obj,
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
