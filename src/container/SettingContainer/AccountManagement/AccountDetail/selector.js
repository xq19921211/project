/**
 * Created by xu.long on 2018/5/27.
 */
import { createSelector } from 'reselect';

const data = state => state.accountDetailReducer.data;

export const getAccountDetail = createSelector([data], data => {
  console.log('selector getAccountDetail : ' + JSON.stringify(data));
  return data;
});
