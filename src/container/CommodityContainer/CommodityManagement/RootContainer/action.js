/**
 * Created by xu.long on 2018/5/16.
 */
import { createAction, Action } from 'redux-actions';
import {
  COMMODITY_MANAGEMENT,
  COMMODITY_MANAGEMENT_SUCCESS,
  COMMODITY_MANAGEMENT_ERROR,
  COMMODITY_MANAGEMENT_FAILED,
  TREE,
  TREE_SUCCESS,
  TREE_ERROR,
  TREE_FAILED,
  MODIFY_LIST_STATUS,
  MODIFY_LIST_STATUS_SUCCESS,
  MODIFY_LIST_STATUS_ERROR,
  MODIFY_LIST_STATUS_FAILED,
} from './constant';

export const initCommodityList = createAction(COMMODITY_MANAGEMENT);
export const initCommodityListSuccess = createAction(
  COMMODITY_MANAGEMENT_SUCCESS,
);
export const initCommodityListError = createAction(COMMODITY_MANAGEMENT_ERROR);
export const initCommodityListFailed = createAction(
  COMMODITY_MANAGEMENT_FAILED,
);

export const initTreeList = createAction(TREE);
export const initTreeListSuccess = createAction(TREE_SUCCESS);
export const initTreeListError = createAction(TREE_ERROR);
export const initTreeListFailed = createAction(TREE_FAILED);

export const modifyListStatus = createAction(MODIFY_LIST_STATUS);
export const modifyListStatusSuccess = createAction(MODIFY_LIST_STATUS_SUCCESS);
export const modifyListStatusError = createAction(MODIFY_LIST_STATUS_ERROR);
export const modifyListStatusFailed = createAction(MODIFY_LIST_STATUS_FAILED);
