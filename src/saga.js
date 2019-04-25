/**
 * Created by xu.long on 2018/5/5.
 */

import { all, fork } from 'redux-saga/effects';

import addCommodityClassifySaga from './container/CommodityContainer/CommodityClassify/AddCommodityClassify/saga';
import commodityClassifySaga from './container/CommodityContainer/CommodityClassify/RootContainer/saga';
import addCommoditySaga from './container/CommodityContainer/CommodityManagement/AddCommodity/saga';
import commodityDetailSaga from './container/CommodityContainer/CommodityManagement/CommodityDetail/saga';
import commodityManagementSaga from './container/CommodityContainer/CommodityManagement/RootContainer/saga';
import DataStatisticsOverviewSaga from './container/DataStatistics/Overview/saga';
import DataStatisticsPersonalDataSaga from './container/DataStatistics/PersonalData/saga';
import DataStatisticsProjectDataSaga from './container/DataStatistics/ProjectData/saga';
import statisticsSaga from './container/DataStatistics/Statistics/saga';
import getMenuListSaga from './container/IndexContainer/saga';
import loginSaga from './container/LoginContainer/saga';
import addBuilderSaga from './container/MerchantContainer/BuilderManagement/AddBuilder/saga';
import builderDetailSaga from './container/MerchantContainer/BuilderManagement/BuilderDetail/saga';
import builderSaga from './container/MerchantContainer/BuilderManagement/RootContainer/saga';
import addBuildTeamSaga from './container/MerchantContainer/BuildTeamManagement/AddBuildTeam/saga';
import buildTeamSaga from './container/MerchantContainer/BuildTeamManagement/RootContainer/saga';
import coverRuleSaga from './container/MerchantContainer/CoverRuleManagement/RootContainer/saga';
import coverRuleDetailSaga from './container/MerchantContainer/CoverRuleManagement/RuleDetail/saga';
import addMerchantSaga from './container/MerchantContainer/MerchantManagement/AddMerchant/saga';
import merchantManagementSaga from './container/MerchantContainer/MerchantManagement/RootContainer/saga';
import addMerchantMemberSaga from './container/MerchantContainer/MerchantMemberManagement/AddMerchantMember/saga';
import merchantMemberDetailSaga from './container/MerchantContainer/MerchantMemberManagement/MerchantMemberDetail/saga';
import merchantMemberSaga from './container/MerchantContainer/MerchantMemberManagement/RootContainer/saga';
import orderDetailSaga from './container/OrderContainer/OrderDetail/saga';
import orderSaga from './container/OrderContainer/OrderManagement/saga';
import accountDetailSaga from './container/SettingContainer/AccountManagement/AccountDetail/saga';
import addAccountSaga from './container/SettingContainer/AccountManagement/AddAccount/saga';
import settingManagementSaga from './container/SettingContainer/AccountManagement/RootContainer/saga';
import addHomePictureSaga from './container/SettingContainer/HomePictureManagement/AddHomePicture/saga';
import homePictureManagementSaga from './container/SettingContainer/HomePictureManagement/RootContainer/saga';
import loginLogRecordSaga from './container/SettingContainer/LoginLogRecordManagement/RootContainer/saga';
import addMenuSaga from './container/SettingContainer/MenuManagement/AddMenu/saga';
import menuManagementSaga from './container/SettingContainer/MenuManagement/RootContainer/saga';
import operateLogRecordSaga from './container/SettingContainer/OperateLogRecordManagement/RootContainer/saga';
import addRoleSaga from './container/SettingContainer/RoleManagement/AddRole/saga';
import roleManagementSaga from './container/SettingContainer/RoleManagement/RootContainer/saga';
import addDepartmentSaga from './container/TenementContainer/OrganizationManagement/AddDepartment/saga';
import organizationSaga from './container/TenementContainer/OrganizationManagement/RootContainer/saga';
import addProjectSaga from './container/TenementContainer/ProjectManagement/AddProject/saga';
import projectDetailSaga from './container/TenementContainer/ProjectManagement/ProjectDetail/saga';
import projectManagementSaga from './container/TenementContainer/ProjectManagement/RootContainer/saga';
import ScheduleSage from './container/TenementContainer/ProjectManagement/Schedule/saga';
import addTenementSaga from './container/TenementContainer/TenementCompanyManagement/AddTenementCompany/saga';
import tenementCompanySaga from './container/TenementContainer/TenementCompanyManagement/RootContainer/saga';
import addTenementMemberSaga from './container/TenementContainer/TenementMemberManagement/AddTenementMember/saga';
import tenementMemberSaga from './container/TenementContainer/TenementMemberManagement/RootContainer/saga';
import tenementMemberDetailSaga from './container/TenementContainer/TenementMemberManagement/TenementMemberDetail/saga';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(commodityManagementSaga),
    fork(commodityClassifySaga),
    fork(merchantManagementSaga),
    fork(merchantMemberSaga),
    fork(orderSaga),
    fork(organizationSaga),
    fork(projectManagementSaga),
    fork(tenementMemberSaga),
    fork(settingManagementSaga),
    fork(addCommoditySaga),
    fork(commodityDetailSaga),
    fork(orderDetailSaga),
    fork(addDepartmentSaga),
    fork(tenementCompanySaga),
    fork(projectDetailSaga),
    fork(addProjectSaga),
    fork(tenementMemberDetailSaga),
    fork(addTenementMemberSaga),
    fork(accountDetailSaga),
    fork(addAccountSaga),
    fork(addCommodityClassifySaga),
    fork(addTenementSaga),
    fork(merchantMemberDetailSaga),
    fork(addMerchantSaga),
    fork(addMerchantMemberSaga),
    fork(builderSaga),
    fork(builderDetailSaga),
    fork(addBuilderSaga),
    fork(buildTeamSaga),
    fork(addBuildTeamSaga),
    fork(operateLogRecordSaga),
    fork(loginLogRecordSaga),
    fork(homePictureManagementSaga),
    fork(addHomePictureSaga),
    fork(coverRuleSaga),
    fork(coverRuleDetailSaga),
    fork(roleManagementSaga),
    fork(addRoleSaga),
    fork(menuManagementSaga),
    fork(addMenuSaga),
    fork(getMenuListSaga),
    fork(ScheduleSage),
    fork(DataStatisticsPersonalDataSaga),
    fork(DataStatisticsOverviewSaga),
    fork(DataStatisticsProjectDataSaga),
  ]);
}
