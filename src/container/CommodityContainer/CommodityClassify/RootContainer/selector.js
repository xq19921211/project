/**
 * Created by xu.long on 2018/5/16.
 */
import { createSelector } from 'reselect';

const data = state => state.commodityClassifyReducer.data;

export const getClassifyList = createSelector([data], data => {
  console.log('selector getClassifyList : ' + JSON.stringify(data));
  return data;
});
