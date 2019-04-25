/**
 * Created by xu.long on 2018/4/21.
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { EC_ROUTER } from './constant';
import {
  addCommodityClassifyReducer,
  name as addCommodityClassifyReducerName,
} from './container/CommodityContainer/CommodityClassify/AddCommodityClassify/reducer';
import {
  commodityClassifyReducer,
  name as commodityClassifyReducerName,
} from './container/CommodityContainer/CommodityClassify/RootContainer/reducer';
import {
  addCommodityReducer,
  name as addCommodityReducerName,
} from './container/CommodityContainer/CommodityManagement/AddCommodity/reducer';
import {
  commodityDetailReducer,
  name as commodityDetailReducerName,
} from './container/CommodityContainer/CommodityManagement/CommodityDetail/reducer';
import {
  commodityManagementReducer,
  name as commodityManagementReducerName,
} from './container/CommodityContainer/CommodityManagement/RootContainer/reducer';
import {
  overviewReducer,
  overviewReducerName,
} from './container/DataStatistics/Overview/reducer';
import {
  personalDataReducer,
  personalDataReducerName,
} from './container/DataStatistics/PersonalData/reducer';
import {
  projectDataReducer,
  projectDataReducerName,
} from './container/DataStatistics/ProjectData/reducer';
import {
  getStatisticsReducer,
  getStatisticsReducerName,
} from './container/DataStatistics/Statistics/reducer';
import {
  getMenuListReducer,
  name as getMenuListReducerName,
} from './container/IndexContainer/reducer';
import {
  loginReducer,
  name as loginReducerName,
} from './container/LoginContainer/reducer';
import {
  addBuilderReducer,
  name as addBuilderReducerName,
} from './container/MerchantContainer/BuilderManagement/AddBuilder/reducer';
import {
  builderDetailReducer,
  name as builderDetailReducerName,
} from './container/MerchantContainer/BuilderManagement/BuilderDetail/reducer';
import {
  builderReducer,
  name as builderReducerName,
} from './container/MerchantContainer/BuilderManagement/RootContainer/reducer';
import {
  addBuildTeamReducer,
  name as addBuildTeamReducerName,
} from './container/MerchantContainer/BuildTeamManagement/AddBuildTeam/reducer';
import {
  buildTeamManagementReducer,
  name as buildTeamManagementReducerName,
} from './container/MerchantContainer/BuildTeamManagement/RootContainer/reducer';
import {
  coverRuleReducer,
  name as coverRuleReducerName,
} from './container/MerchantContainer/CoverRuleManagement/RootContainer/reducer';
import {
  coverRuleDetailReducer,
  name as coverRuleDetailReducerName,
} from './container/MerchantContainer/CoverRuleManagement/RuleDetail/reducer';
import {
  addMerchantReducer,
  name as addMerchantReducerName,
} from './container/MerchantContainer/MerchantManagement/AddMerchant/reducer';
import {
  merchantManagementReducer,
  name as merchantManagementReducerName,
} from './container/MerchantContainer/MerchantManagement/RootContainer/reducer';
import {
  addMerchantMemberReducer,
  name as addMerchantMemberReducerName,
} from './container/MerchantContainer/MerchantMemberManagement/AddMerchantMember/reducer';
import {
  merchantMemberDetailReducer,
  name as merchantMemberDetailReducerName,
} from './container/MerchantContainer/MerchantMemberManagement/MerchantMemberDetail/reducer';
import {
  merchantMemberReducer,
  name as merchantMemberReducerName,
} from './container/MerchantContainer/MerchantMemberManagement/RootContainer/reducer';
import {
  orderDetailReducer,
  name as orderDetailReducerName,
} from './container/OrderContainer/OrderDetail/reducer';
import {
  orderReducer,
  name as orderReducerName,
} from './container/OrderContainer/OrderManagement/reducer';
import {
  accountDetailReducer,
  name as accountDetailReducerName,
} from './container/SettingContainer/AccountManagement/AccountDetail/reducer';
import {
  addAccountReducer,
  name as addAccountReducerName,
} from './container/SettingContainer/AccountManagement/AddAccount/reducer';
import {
  settingManagementReducer,
  name as settingManagementReducerName,
} from './container/SettingContainer/AccountManagement/RootContainer/reducer';
import {
  addHomePictureReducer,
  name as addHomePictureReducerName,
} from './container/SettingContainer/HomePictureManagement/AddHomePicture/reducer';
import {
  homePictureManagementReducer,
  name as homePictureManagementReducerName,
} from './container/SettingContainer/HomePictureManagement/RootContainer/reducer';
import {
  loginLogRecordReducer,
  name as loginLogRecordReducerName,
} from './container/SettingContainer/LoginLogRecordManagement/RootContainer/reducer';
import {
  addMenuReducer,
  name as addMenuReducerName,
} from './container/SettingContainer/MenuManagement/AddMenu/reducer';
import {
  menuManagementReducer,
  name as menuManagementReducerName,
} from './container/SettingContainer/MenuManagement/RootContainer/reducer';
import {
  operateLogRecordReducer,
  name as operateLogRecordReducerName,
} from './container/SettingContainer/OperateLogRecordManagement/RootContainer/reducer';
import {
  addRoleReducer,
  name as addRoleReducerName,
} from './container/SettingContainer/RoleManagement/AddRole/reducer';
import {
  roleManagementReducer,
  name as roleManagementReducerName,
} from './container/SettingContainer/RoleManagement/RootContainer/reducer';
import {
  addDepartmentReducer,
  name as addDepartmentReducerName,
} from './container/TenementContainer/OrganizationManagement/AddDepartment/reducer';
import {
  organizationManagementReducer,
  name as organizationManagementReducerName,
} from './container/TenementContainer/OrganizationManagement/RootContainer/reducer';
import {
  addProjectReducer,
  name as addProjectReducerName,
} from './container/TenementContainer/ProjectManagement/AddProject/reducer';
import {
  projectDetailReducer,
  name as projectDetailReducerName,
} from './container/TenementContainer/ProjectManagement/ProjectDetail/reducer';
import {
  projectManagementReducer,
  name as projectManagementReducerName,
} from './container/TenementContainer/ProjectManagement/RootContainer/reducer';
import {
  ProjectManagementScheduleReducer,
  ProjectManagementScheduleReducerName,
} from './container/TenementContainer/ProjectManagement/Schedule/reducer';
import {
  addTenementReducer,
  name as addTenementReducerName,
} from './container/TenementContainer/TenementCompanyManagement/AddTenementCompany/reducer';
import {
  tenementCompanyReducer,
  name as tenementCompanyReducerName,
} from './container/TenementContainer/TenementCompanyManagement/RootContainer/reducer';
import {
  addTenementMemberReducer,
  name as addTenementMemberReducerName,
} from './container/TenementContainer/TenementMemberManagement/AddTenementMember/reducer';
import {
  tenementMemberReducer,
  name as tenementMemberReducerName,
} from './container/TenementContainer/TenementMemberManagement/RootContainer/reducer';
import {
  tenementMemberDetailReducer,
  name as tenementMemberDetailReducerName,
} from './container/TenementContainer/TenementMemberManagement/TenementMemberDetail/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    [EC_ROUTER]: routerReducer,
    [loginReducerName]: loginReducer,
    [commodityManagementReducerName]: commodityManagementReducer,
    [commodityClassifyReducerName]: commodityClassifyReducer,
    [merchantManagementReducerName]: merchantManagementReducer,
    [merchantMemberReducerName]: merchantMemberReducer,
    [orderReducerName]: orderReducer,
    [organizationManagementReducerName]: organizationManagementReducer,
    [projectManagementReducerName]: projectManagementReducer,
    [tenementMemberReducerName]: tenementMemberReducer,
    [settingManagementReducerName]: settingManagementReducer,
    [addCommodityReducerName]: addCommodityReducer,
    [commodityDetailReducerName]: commodityDetailReducer,
    [orderDetailReducerName]: orderDetailReducer,
    [addDepartmentReducerName]: addDepartmentReducer,
    [tenementCompanyReducerName]: tenementCompanyReducer,
    [projectDetailReducerName]: projectDetailReducer,
    [addProjectReducerName]: addProjectReducer,
    [tenementMemberDetailReducerName]: tenementMemberDetailReducer,
    [addTenementMemberReducerName]: addTenementMemberReducer,
    [accountDetailReducerName]: accountDetailReducer,
    [addAccountReducerName]: addAccountReducer,
    [addMerchantReducerName]: addMerchantReducer,
    [addCommodityClassifyReducerName]: addCommodityClassifyReducer,
    [addTenementReducerName]: addTenementReducer,
    [merchantMemberDetailReducerName]: merchantMemberDetailReducer,
    [addMerchantMemberReducerName]: addMerchantMemberReducer,
    [builderReducerName]: builderReducer,
    [builderDetailReducerName]: builderDetailReducer,
    [addBuilderReducerName]: addBuilderReducer,
    [buildTeamManagementReducerName]: buildTeamManagementReducer,
    [addBuildTeamReducerName]: addBuildTeamReducer,
    [operateLogRecordReducerName]: operateLogRecordReducer,
    [loginLogRecordReducerName]: loginLogRecordReducer,
    [homePictureManagementReducerName]: homePictureManagementReducer,
    [addHomePictureReducerName]: addHomePictureReducer,
    [coverRuleReducerName]: coverRuleReducer,
    [coverRuleDetailReducerName]: coverRuleDetailReducer,
    [roleManagementReducerName]: roleManagementReducer,
    [addRoleReducerName]: addRoleReducer,
    [menuManagementReducerName]: menuManagementReducer,
    [addMenuReducerName]: addMenuReducer,
    [getStatisticsReducerName]: getStatisticsReducer,
    [getMenuListReducerName]: getMenuListReducer,
    [ProjectManagementScheduleReducerName]: ProjectManagementScheduleReducer,
    [personalDataReducerName]: personalDataReducer,
    [overviewReducerName]: overviewReducer,
    [projectDataReducerName]: projectDataReducer,
    ...asyncReducers,
  });
}
