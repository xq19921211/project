import * as actions from './action';

import { handleActions } from 'redux-actions';

export const ProjectManagementScheduleReducerName =
  'ProjectManagement/Schedule';

export const ProjectManagementScheduleReducer = handleActions(
  {
    [actions.getScheduleDetailSuccess]: (state, action) => {
      return {
        ...state,
        ...{
          scheduleDetailList: action.payload.data,
        },
      };
    },
  },

  {
    scheduleDetailList: [],
  },
);
