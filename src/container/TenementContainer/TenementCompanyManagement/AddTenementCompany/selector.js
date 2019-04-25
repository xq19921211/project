/**
 * Created by xu.long on 2018/5/18.
 */
import { createSelector } from 'reselect';

const detailData = state => state.addTenementReducer.detailData;

export const getTenementDetail = createSelector([detailData], detailData => {
  return detailData;
});
