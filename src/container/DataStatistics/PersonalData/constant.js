/*
 * @Author: LiaoYingLong
 * @Date: 2018-10-21 18:35:27
 * @Last Modified by: LiaoYingLong
 * @Last Modified time: 2018-10-25 10:57:16
 */
const prefix = 'PERSONAL_DATA/';

/**
 * 获取个人数据全部信息
 */
export const GET_OPERATOR_ALL_DATA_REPORT = `${prefix}GET_OPERATOR_ALL_DATA_REPORT`;
export const GET_OPERATOR_ALL_DATA_REPORT_SUCCESS = `${prefix}GET_OPERATOR_ALL_DATA_REPORT_SUCCESS`;
export const GET_OPERATOR_ALL_DATA_REPORT_ERROR = `${prefix}GET_OPERATOR_ALL_DATA_REPORT_ERROR`;
/**
 * 获取个人数据 订单画像
 */
export const GET_OPERATOR_ANALYSIS = `${prefix}GET_OPERATOR_ANALYSIS`;
export const GET_OPERATOR_ANALYSIS_SUCCESS = `${prefix}GET_OPERATOR_ANALYSIS_SUCCESS`;
export const GET_OPERATOR_ANALYSIS_ERROR = `${prefix}GET_OPERATOR_ANALYSIS_ERROR`;
/**
 * 获取个人数据 收入画像
 */
export const GET_OPERATOR_INCOME = `${prefix}GET_OPERATOR_INCOME`;
export const GET_OPERATOR_INCOME_SUCCESS = `${prefix}GET_OPERATOR_INCOME_SUCCESS`;
export const GET_OPERATOR_INCOME_ERROR = `${prefix}GET_OPERATOR_INCOME_ERROR`;

export const RESET_STORE = 'INIT';
