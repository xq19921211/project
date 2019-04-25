/**
 * Created by xu.long on 2018/6/18.
 */
import { createSelector } from 'reselect';

const buildTeamDetail = state => state.addBuildTeamReducer.buildTeamDetail;

export const getBuildTeamDetail = createSelector(
  [buildTeamDetail],
  buildTeamDetail => {
    console.log(
      'selector getBuildTeamDetail : ' + JSON.stringify(buildTeamDetail),
    );
    return buildTeamDetail;
  },
);
