/**
 * date type
 */
export const DATE_TYPE = {
  SAN_SHI_YI: { name: '31天排班', value: 4 },
  SAN_SHI: { name: '30天排班', value: 3 },
  ER_SHI_JIU: { name: '29天排班', value: 2 },
  ER_SHI_BA: { name: '28天排班', value: 1 },
};
export const DAYS = {
  [DATE_TYPE.SAN_SHI_YI.value]: 31,
  [DATE_TYPE.SAN_SHI.value]: 30,
  [DATE_TYPE.ER_SHI_JIU.value]: 29,
  [DATE_TYPE.ER_SHI_BA.value]: 28,
};
/**
 * 根据施工队id查询排班详情
 */
export const GET_SCHEDULE_DETAIL = 'GET_SCHEDULE_DETAIL';
export const GET_SCHEDULE_DETAIL_SUCCESS = 'GET_SCHEDULE_DETAIL_SUCCESS';
export const GET_SCHEDULE_DETAIL_ERROR = 'GET_SCHEDULE_DETAIL_ERROR';

/**
 * 新增排班表
 */
export const ADD_SCHEDULE = 'ADD_SCHEDULE';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';
