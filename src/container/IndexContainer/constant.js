/**
 * Created by xu.long on 26/03/2018.
 */
const prefix = str => `IndexContainer/${str}`;

export const GET_MENU_LIST = prefix('GetMenuList');
export const GET_MENU_LIST_SUCCESS = prefix('GetMenuListSuccess');
export const GET_MENU_LIST_ERROR = prefix('GetMenuListError');
export const GET_MENU_LIST_FAILED = prefix('GetMenuListFailed');

export const GET_USER_INFO = prefix('GetUserInfo');
export const GET_USER_INFO_SUCCESS = prefix('GetUserInfoSuccess');
export const GET_USER_INFO_ERROR = prefix('GetUserInfoError');
export const GET_USER_INFO_FAILED = prefix('GetUserInfoFailed');

export const MODIFY_PASSWORD = prefix('modifyPassword');
export const MODIFY_PASSWORD_SUCCESS = prefix('modifyPasswordSuccess');
export const MODIFY_PASSWORD_ERROR = prefix('modifyPasswordError');
