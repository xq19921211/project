/**
 * Created by xu.long on 2018/5/16.
 */

const prefix = str => `TenementContainer/${str}`;

export const PROJECT_MANAGEMENT = prefix('ProjectManagement');
export const PROJECT_MANAGEMENT_SUCCESS = prefix('ProjectManagementSuccess');
export const PROJECT_MANAGEMENT_ERROR = prefix('ProjectManagementError');
export const PROJECT_MANAGEMENT_FAILED = prefix('ProjectManagementFailed');

export const PROJECT_DEL = prefix('projectDel');
export const PROJECT_DEL_SUCCESS = prefix('projectDelSuccess');
export const PROJECT_DEL_FAILED = prefix('projectDelFailed');

/** 导入 */
export const IMPORT_EXCEL = 'importExcel';
export const IMPORT_EXCEL_SUCCESS = 'importExcelSuccess';
export const IMPORT_EXCEL_FAILED = 'importExcelFailed';

/** 导出 */
export const EXPORT_EXCEL = 'exportExcel';
export const EXPORT_EXCEL_SUCCESS = 'exportExcelSuccess';
export const EXPORT_EXCEL_FAILED = 'exportExcelFailed';
