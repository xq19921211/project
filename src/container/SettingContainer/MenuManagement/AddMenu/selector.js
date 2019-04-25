/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

const detailData = state => state.addMenuReducer.detailData;

export const getMenuDetail = createSelector([detailData], detailData => {
  return detailData;
});
