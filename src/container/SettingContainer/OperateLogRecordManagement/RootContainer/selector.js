/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

const data = state => state.operateLogRecordReducer.data;

export const getLogRecordList = createSelector([data], data => {
  console.log('selector getLogRecordList : ' + JSON.stringify(data));
  return data;
});
