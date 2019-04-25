/**
 * Created by xu.long on 2018/6/23.
 */
import { createSelector } from 'reselect';

export const getRoleList = createSelector(
  state => {
    return state.roleManagementReducer.data;
  },
  data => data,
);

export const getAllUserListSelector = createSelector(
  state => state.roleManagementReducer.allUserList,
  data => data,
);

export const getMenuListByRoleIdSelector = createSelector(
  state => state.roleManagementReducer.menuListByRoleId,
  data => data,
);
