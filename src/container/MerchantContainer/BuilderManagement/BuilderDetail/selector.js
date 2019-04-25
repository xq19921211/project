/**
 * Created by xu.long on 2018/6/18.
 */
import { createSelector } from 'reselect';

const data = state => state.builderDetailReducer.data;

export const getBuilderDetail = createSelector([data], data => {
  console.log('selector getBuilderDetail : ' + JSON.stringify(data));
  return data;
});
