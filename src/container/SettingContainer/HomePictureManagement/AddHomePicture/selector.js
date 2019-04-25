/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

const detailData = state => state.addHomePictureReducer.detailData;

export const getHomePictureDetail = createSelector(
  [detailData],
  detailData => detailData,
);
