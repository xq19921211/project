/**
 * Created by xu.long on 2018/6/18.
 */
import { createSelector } from 'reselect';

const data = state => state.builderReducer.data;

export const getBuilderList = createSelector([data], data => {
  return data;
});
