/**
 * Created by xu.long on 2018/5/21.
 */
import { createSelector } from 'reselect';

const data = state => state.orderDetailReducer.data;

export const getOrderDetail = createSelector([data], data => {
  console.log('selector getOrderDetail : ' + JSON.stringify(data));
  return data;
});
