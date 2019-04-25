/**
 * Created by xu.long on 2018/5/16.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  COMMODITY_CLASSIFY,
  COMMODITY_CLASSIFY_SUCCESS,
  COMMODITY_CLASSIFY_ERROR,
  COMMODITY_CLASSIFY_FAILED,
} from './constant';
import {
  initClassifyListSuccess,
  initClassifyListError,
  initClassifyListFailed,
} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initClassifyList(action) {
  try {
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: urlGenerator(
        window.hempConfig.apiPath + '/category/product/list',
        action.payload.data,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/category/product/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(
          initClassifyListSuccess({
            type: action.payload.type,
            data: json,
          }),
        );
      } else if (json.code === 1) {
        message.error(!json.data ? '商品分类查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initClassifyListError(response.status));
      message.error('商品分类查询失败');
    }
  } catch (e) {
    yield put(initClassifyListFailed(e));
    message.error('系统错误');
  }
}
export default function* commodityClassifySaga() {
  yield takeEvery(COMMODITY_CLASSIFY, initClassifyList);
}
