/**
 * Created by xu.long on 2018/5/18.
 */

import { createSelector } from 'reselect';

const merchantDetail = state => state.addMerchantReducer.merchantDetail;

export const getMerchantDetail = createSelector(
  [merchantDetail],
  merchantDetail => {
    console.log(
      'selector getMerchantDetail : ' + JSON.stringify(merchantDetail),
    );
    return merchantDetail;
  },
);
