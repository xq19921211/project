/**
 * Created by xu.long on 26/03/2018.
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

import AddCommodityClassifyForm from './container/CommodityContainer/CommodityClassify/AddCommodityClassify';
import CommodityClassifyForm from './container/CommodityContainer/CommodityClassify/RootContainer/index';
import AddCommodityForm from './container/CommodityContainer/CommodityManagement/AddCommodity';
import CommodityDetail from './container/CommodityContainer/CommodityManagement/CommodityDetail';
import CommodityManagementForm from './container/CommodityContainer/CommodityManagement/RootContainer';
import BusinessData from './container/DataStatistics/BusinessData';
import Overview from './container/DataStatistics/Overview';
import PersonalData from './container/DataStatistics/PersonalData';
import ProjectData from './container/DataStatistics/ProjectData';
import Statistics from './container/DataStatistics/Statistics';
import Index from './container/IndexContainer';
import LoginForm from './container/LoginContainer';
import AddBuilderForm from './container/MerchantContainer/BuilderManagement/AddBuilder';
import BuilderDetail from './container/MerchantContainer/BuilderManagement/BuilderDetail';
import BuilderManagementForm from './container/MerchantContainer/BuilderManagement/RootContainer';
import AddBuildTeamForm from './container/MerchantContainer/BuildTeamManagement/AddBuildTeam';
import BuildTeamManagementForm from './container/MerchantContainer/BuildTeamManagement/RootContainer';
import CoverRuleManagementForm from './container/MerchantContainer/CoverRuleManagement/RootContainer';
import CoverRuleDetail from './container/MerchantContainer/CoverRuleManagement/RuleDetail';
import AddMerchantForm from './container/MerchantContainer/MerchantManagement/AddMerchant';
import MerchantManagementForm from './container/MerchantContainer/MerchantManagement/RootContainer';
import AddMerchantMemberForm from './container/MerchantContainer/MerchantMemberManagement/AddMerchantMember';
import MerchantMemberDetail from './container/MerchantContainer/MerchantMemberManagement/MerchantMemberDetail';
import MerchantMemberManagementForm from './container/MerchantContainer/MerchantMemberManagement/RootContainer';
import OrderDetail from './container/OrderContainer/OrderDetail';
import OrderManagementForm from './container/OrderContainer/OrderManagement';
import AccountDetail from './container/SettingContainer/AccountManagement/AccountDetail';
import AddAccountForm from './container/SettingContainer/AccountManagement/AddAccount';
import SettingManagementForm from './container/SettingContainer/AccountManagement/RootContainer';
import AddHomePictureForm from './container/SettingContainer/HomePictureManagement/AddHomePicture';
import HomePictureManagementForm from './container/SettingContainer/HomePictureManagement/RootContainer';
import LoginLogRecordManagementForm from './container/SettingContainer/LoginLogRecordManagement/RootContainer';
import AddMenuForm from './container/SettingContainer/MenuManagement/AddMenu';
import MenuForm from './container/SettingContainer/MenuManagement/RootContainer';
import OperateLogRecordManagementForm from './container/SettingContainer/OperateLogRecordManagement/RootContainer';
import AddRole from './container/SettingContainer/RoleManagement/AddRole';
import RoleManagementForm from './container/SettingContainer/RoleManagement/RootContainer';
import AddDepartmentForm from './container/TenementContainer/OrganizationManagement/AddDepartment';
import OrganizationManagementForm from './container/TenementContainer/OrganizationManagement/RootContainer';
import AddProjectForm from './container/TenementContainer/ProjectManagement/AddProject';
import ProjectDetail from './container/TenementContainer/ProjectManagement/ProjectDetail';
import ProjectManagementForm from './container/TenementContainer/ProjectManagement/RootContainer';
import Schedule from './container/TenementContainer/ProjectManagement/Schedule';
import { AddRegionForm } from './container/TenementContainer/RegionManagement/AddRegion';
import { RegionManagementForm } from './container/TenementContainer/RegionManagement/RootContainer';
import AddTenementCompanyForm from './container/TenementContainer/TenementCompanyManagement/AddTenementCompany';
import TenementCompanyManagementForm from './container/TenementContainer/TenementCompanyManagement/RootContainer';
import AddTenementMemberForm from './container/TenementContainer/TenementMemberManagement/AddTenementMember';
import TenementMemberManagementForm from './container/TenementContainer/TenementMemberManagement/RootContainer';
import TenementMemberDetail from './container/TenementContainer/TenementMemberManagement/TenementMemberDetail';

export default function createFirstRoutes() {
  return [
    {
      key: 'login',
      path: '/login',
      component: LoginForm,
      exact: true,
    },
    {
      key: 'index',
      path: '/index',
      component: Index,
      routes: [
        {
          key: 'commodityManagement',
          path: '/index/commodityManagement',
          component: CommodityManagementForm,
          parent: 'commodity',
        },
        {
          key: 'addCommodity',
          path: '/index/addCommodity/:action/:id',
          component: AddCommodityForm,
          parent: 'commodity',
        },
        {
          key: 'commodityClassify',
          path: '/index/commodityClassify',
          component: CommodityClassifyForm,
          parent: 'commodity',
        },
        {
          key: 'commodityDetail',
          path: '/index/commodityDetail/:id',
          component: CommodityDetail,
          parent: 'commodity',
        },
        {
          key: 'addCommodityClassify',
          path: '/index/addCommodityClassify/:action/:id',
          component: AddCommodityClassifyForm,
          parent: 'commodity',
        },
        {
          key: 'orderManagement',
          path: '/index/orderManagement',
          component: OrderManagementForm,
          parent: 'order',
        },
        {
          key: 'orderDetail',
          path: '/index/orderDetail/:orderNum',
          component: OrderDetail,
          parent: 'order',
        },
        {
          key: 'merchantManagement',
          path: '/index/merchantManagement',
          component: MerchantManagementForm,
          parent: 'merchant',
        },
        {
          key: 'addMerchant',
          path: '/index/addMerchant/:action/:id',
          component: AddMerchantForm,
          parent: 'merchant',
        },
        {
          key: 'merchantMemberManagement',
          path: '/index/merchantMemberManagement',
          component: MerchantMemberManagementForm,
          parent: 'merchant',
        },
        {
          key: 'addMerchantMember',
          path: '/index/addMerchantMember/:action/:id',
          component: AddMerchantMemberForm,
          parent: 'merchant',
        },
        {
          key: 'merchantMemberDetail',
          path: '/index/merchantMemberDetail/:id',
          component: MerchantMemberDetail,
          parent: 'merchant',
        },
        {
          key: 'settingManagement',
          path: '/index/settingManagement',
          component: SettingManagementForm,
          parent: 'setting',
        },
        {
          key: 'accountDetail',
          path: '/index/accountDetail/:id',
          component: AccountDetail,
          parent: 'setting',
        },
        {
          key: 'addAccount',
          path: '/index/addAccount/:action/:id',
          component: AddAccountForm,
          parent: 'setting',
        },
        {
          key: 'tenementCompanyManagement',
          path: '/index/tenementCompanyManagement',
          component: TenementCompanyManagementForm,
          parent: 'tenement',
        },
        {
          key: 'addTenementCompany',
          path: '/index/addTenementCompany/:action/:id',
          component: AddTenementCompanyForm,
          parent: 'tenement',
        },
        {
          key: 'regionManagement',
          path: '/index/regionManagement',
          component: RegionManagementForm,
          parent: 'tenement',
        },
        {
          key: 'addRegion',
          path: '/index/addRegion',
          component: AddRegionForm,
          parent: 'tenement',
        },
        {
          key: 'organizationManagement',
          path: '/index/organizationManagement',
          component: OrganizationManagementForm,
          parent: 'tenement',
        },
        {
          key: 'addDepartment',
          path: '/index/addDepartment/:action/:id',
          component: AddDepartmentForm,
          parent: 'tenement',
        },
        {
          key: 'projectManagement',
          path: '/index/projectManagement',
          component: ProjectManagementForm,
          parent: 'tenement',
        },
        {
          key: 'addProject',
          path: '/index/addProject/:action/:id',
          component: AddProjectForm,
          parent: 'tenement',
        },
        {
          key: 'projectDetail',
          path: '/index/projectDetail/:id',
          component: ProjectDetail,
          parent: 'tenement',
        },
        {
          key: 'tenementMemberManagement',
          path: '/index/tenementMemberManagement',
          component: TenementMemberManagementForm,
          parent: 'tenement',
        },
        {
          key: 'addTenementMember',
          path: '/index/addTenementMember/:action/:id',
          component: AddTenementMemberForm,
          parent: 'tenement',
        },
        {
          key: 'tenementMemberDetail',
          path: '/index/tenementMemberDetail/:id',
          component: TenementMemberDetail,
          parent: 'tenement',
        },
        {
          key: 'builderManagement',
          path: '/index/builderManagement',
          component: BuilderManagementForm,
          parent: 'merchant',
        },
        {
          key: 'builderDetail',
          path: '/index/builderDetail/:id',
          component: BuilderDetail,
          parent: 'merchant',
        },
        {
          key: 'addBuilder',
          path: '/index/addBuilder/:action/:id',
          component: AddBuilderForm,
          parent: 'merchant',
        },
        {
          key: 'buildTeamManagement',
          path: '/index/buildTeamManagement',
          component: BuildTeamManagementForm,
          parent: 'merchant',
        },
        {
          key: 'addBuildTeam',
          path: '/index/addBuildTeam/:action/:id',
          component: AddBuildTeamForm,
          parent: 'merchant',
        },
        {
          key: 'Schedule',
          path: '/index/Schedule/:id',
          component: Schedule,
          parent: 'merchant',
        },
        {
          key: 'coverRuleManagement',
          path: '/index/coverRuleManagement',
          component: CoverRuleManagementForm,
          parent: 'merchant',
        },
        {
          key: 'coverRuleDetail',
          path: '/index/coverRuleDetail/:id',
          component: CoverRuleDetail,
          parent: 'merchant',
        },
        {
          key: 'OperateLogRecordManagement',
          path: '/index/operateLogRecordManagement',
          component: OperateLogRecordManagementForm,
          parent: 'setting',
        },
        {
          key: 'loginLogRecordManagement',
          path: '/index/loginLogRecordManagement',
          component: LoginLogRecordManagementForm,
          parent: 'setting',
        },
        {
          key: 'homePictureManagement',
          path: '/index/homePictureManagement',
          component: HomePictureManagementForm,
          parent: 'setting',
        },
        {
          key: 'addHomePicture',
          path: '/index/addHomePicture/:action/:id',
          component: AddHomePictureForm,
          parent: 'setting',
        },
        {
          key: 'roleManagement',
          path: '/index/roleManagement',
          component: RoleManagementForm,
          parent: 'setting',
        },
        {
          key: 'addRole',
          path: '/index/addRole/:action/:id',
          component: AddRole,
          parent: 'setting',
        },
        {
          key: 'menuManagement',
          path: '/index/menuManagement',
          component: MenuForm,
          parent: 'setting',
        },
        {
          key: 'addMenu',
          path: '/index/addMenu/:action/:id',
          component: AddMenuForm,
          parent: 'setting',
        },
        {
          key: 'statistics',
          path: '/index/statistics',
          component: Statistics,
          parent: 'DataStatistics',
        },
        {
          key: 'BusinessData',
          path: '/index/BusinessData',
          component: BusinessData,
          parent: 'DataStatistics',
        },
        {
          key: 'Overview',
          path: '/index/Overview',
          component: Overview,
          parent: 'DataStatistics',
        },
        {
          key: 'PersonalData',
          path: '/index/PersonalData',
          component: PersonalData,
          parent: 'DataStatistics',
        },
        {
          key: 'ProjectData',
          path: '/index/ProjectData',
          component: ProjectData,
          parent: 'DataStatistics',
        },
      ],
    },
    {
      path: '/',
      render: () => <Redirect to="/login" />,
    },
  ];
}
// export function createSecondRoutes() {
//     return [
//         {
//             key:'commodityManagement',
//             path: '/index/commodityManagement',
//             component: CommodityManagementForm,
//             exact: true
//         },
//         {
//             key:'commodityClassify',
//             path: '/index/commodityClassify',
//             component: CommodityClassify,
//             exact: true
//         }
//     ];
// }
