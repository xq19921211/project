/**
 * Created by xu.long on 2018/6/23.
 */
export const ROLE_MANAGEMENT = 'SettingContainer/RoleManagement';
export const ROLE_MANAGEMENT_SUCCESS = 'SettingContainer/RoleManagementSuccess';
export const ROLE_MANAGEMENT_ERROR = 'SettingContainer/RoleManagementError';
export const ROLE_MANAGEMENT_FAILED = 'SettingContainer/RoleManagementFailed';

const prefix = str => `SettingContainer/RoleManagement/${str}`;

export const MODIFY_LIST_STATUS = prefix('modifyListStatus');
export const MODIFY_LIST_STATUS_SUCCESS = prefix('modifyListStatusSuccess');
export const MODIFY_LIST_STATUS_ERROR = prefix('modifyListStatusError');
export const MODIFY_LIST_STATUS_FAILED = prefix('modifyListStatusFailed');

export const ADD_ROLE_MENU = prefix('AddRoleMenu');
export const ADD_ROLE_MENU_SUCCESS = prefix('AddRoleMenuSuccess');
export const ADD_ROLE_MENU_ERROR = prefix('AddRoleMenuError');
export const ADD_ROLE_MENU_FAILED = prefix('AddRoleMenuFailed');

/**
 * 获取所有用户信息
 */
export const GET_ALL_USER_LIST = prefix('getAllUserList');
export const GET_ALL_USER_LIST_SUCCESS = prefix('getAllUserListSuccess');
export const GET_ALL_USER_LIST_ERROR = prefix('getAllUserListError');
export const GET_ALL_USER_LIST_FAILED = prefix('getAllUserListFailed');
/**
 * 获取所有用户信息
 */
export const ADD_USER_ROLE = prefix('addUserRole');
export const ADD_USER_ROLE_SUCCESS = prefix('addUserRoleSuccess');
export const ADD_USER_ROLE_ERROR = prefix('addUserRoleError');
export const ADD_USER_ROLE_FAILED = prefix('addUserRoleFailed');
/**
 * 获取角色对应的菜单列表信息
 */
export const GET_MENU_LIST_BY_ROLE_ID = prefix('getMenuListByRoleId');
export const GET_MENU_LIST_BY_ROLE_ID_SUCCESS = prefix(
  'getMenuListByRoleIdSuccess',
);
export const GET_MENU_LIST_BY_ROLE_ID_ERROR = prefix(
  'getMenuListByRoleIdError',
);
