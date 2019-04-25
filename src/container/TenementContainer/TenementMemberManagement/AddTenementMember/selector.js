/**
 * Created by xu.long on 2018/5/18.
 */
import { createSelector } from 'reselect';

const data = state => state.addTenementMemberReducer.data;

export const getIceList = createSelector([data], data => {
  console.log('selector getIceList : ' + JSON.stringify(data));
  return data;
});
