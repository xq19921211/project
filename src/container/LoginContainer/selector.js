/**
 * Created by xu.long on 27/03/2018.
 */
import { createSelector } from 'reselect';

const status = state => state.loginReducer.status;

export const getLoginResult = createSelector([status], status => {
  console.log('selector getLoginResult : ' + JSON.stringify(status));
  return status;
});
export const getLogoutResult = createSelector([status], status => {
  console.log('selector getLoginResult : ' + JSON.stringify(status));
  return status;
});
