/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

const data = state => state.homePictureManagementReducer.data;

export const getHomePictureList = createSelector([data], data => data);
