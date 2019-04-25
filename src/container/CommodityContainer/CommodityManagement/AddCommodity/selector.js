/**
 * Created by xu.long on 2018/5/20.
 */
import { createSelector } from 'reselect';

const unitList = state => state.addCommodityReducer.unitList;

export const getUnitList = createSelector([unitList], unitList => {
  return unitList;
});
