/**
 * Created by xu.long on 2018/6/5.
 */
import { createSelector } from 'reselect';

const detailData = state => state.addCommodityClassifyReducer.detailData;

export const getCommodityClassifyDetail = createSelector(
  [detailData],
  detailData => {
    console.log(
      'selector getCommodityClassifyDetail : ' + JSON.stringify(detailData),
    );
    return detailData;
  },
);
