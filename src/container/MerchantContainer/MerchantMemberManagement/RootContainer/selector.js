/**
 * Created by xu.long on 2018/5/18.
 */
import { createSelector } from 'reselect';

const data = state => state.merchantMemberReducer.data;

export const getMerchantMemberList = createSelector([data], data => {
  console.log('selector getMerchantMemberList : ' + JSON.stringify(data));
  return data;
});
//
// const roleData = (state) => state.merchantMemberReducer.roleData;
//
// export const getRoleList = createSelector(
//     [ roleData ],
//     (roleData) => {
//         console.log('selector getRoleList : ' + JSON.stringify(roleData));
//         return roleData;
//     }
// );
