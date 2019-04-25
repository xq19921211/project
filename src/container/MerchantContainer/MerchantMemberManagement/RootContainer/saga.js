/**
 * Created by xu.long on 2018/5/18.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import { MERCHANT_MEMBER, MODIFY_LIST_STATUS,DELETE_MERCHANTMEMBER} from './constant';
import {
  initMerchantMemberListSuccess,
  initMerchantMemberListError,
  initMerchantMemberListFailed,
  // initRoleListSuccess,
  // initRoleListError,
  // initRoleListFailed
  modifyListStatusSuccess,
  modifyListStatusFailed,
  modifyListStatusError,

  deletemerchantmember,
  deletemerchantmemberSuccess,
  deletemerchantmemberError,
  deletemerchantmemberFailed,

} from './action';
import { urlGenerator } from '../../../../util/util';
import { request } from '../../../../util/request';
function* initMerchantMemberList(action) {
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
        window.hempConfig.apiPath + '/sup/staff/list',
        action.payload,
      ),
    };
    // let param;
    // for(let item in action.payload){
    //     param = item + '=' + '&'
    // }
    // const url = urlGenerator(window.hempConfig.basePath + '/sup/staff/list', action.payload);
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(initMerchantMemberListSuccess(json));
      } else if (json.code === 1) {
        message.error(!json.data ? '保安公司人员查询失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(initMerchantMemberListFailed(response.status));
      message.error('保安公司人员查询失败');
    }
  } catch (e) {
    yield put(initMerchantMemberListError(e));
    message.error('系统错误');
  }
}
// function* initRoleList(action) {
//     try {
//         const request = {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-cache'
//             }
//         };
//         // let param;
//         // for(let item in action.payload){
//         //     param = item + '=' + '&'
//         // }
//         const url = urlGenerator(window.hempConfig.basePath + '/category/product/list', action.payload);
//         const response = (yield call(fetch, url, request));
//         if (response.ok) {
//             let json = yield response.json();
//             // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
//             if(json.code === 0){
//                 yield put(initRoleListSuccess(json));
//             } else if(json.code === 1){
//                 message.error(!json.data? '角色查询失败': json.data);
//             }
//         } else {
//             // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
//             yield put(initRoleListFailed(response.status));
//             message.error('角色查询失败');
//         }
//     } catch (e) {
//         yield put(initRoleListError(e));
//         message.error('系统错误');
//     }
// }
function* modifyListStatus(action) {
  try {
    let fragment = '/sup/staff/unlock';
    if (action.payload.status === 0) {
      fragment = '/sup/staff/lock';
    }
    const url = urlGenerator(window.hempConfig.apiPath + fragment, {
      id: action.payload.id,
    });
    const req = {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: url,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(
          modifyListStatusSuccess({
            json: json,
            record: action.payload,
          }),
        );
        message.success('保安公司人员状态修改成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '保安公司人员状态修改失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(modifyListStatusFailed(response.status));
      message.error('保安公司人员状态修改失败');
    }
  } catch (e) {
    yield put(modifyListStatusError(e));
    message.error('系统错误');
  }
}

function* deleteMerchantMember(action) {
  try {
    let fragment = '/sup/staff/delete';

    const url = urlGenerator(window.hempConfig.apiPath + fragment, {
      staff_id: action.payload.id,
    });
    const req = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      url: url,
    };
    const response = yield call(request, req);
    if (response.ok) {
      let json = yield response.json();
      // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
      if (json.code === 0) {
        yield put(
          deletemerchantmemberSuccess({
            json: json,
            record: action.payload,
          }),
        );
        message.success('删除成功');
        // window.myHistory.goBack();
      } else if (json.code === 1) {
        message.error(!json.data ? '删除失败' : json.data);
      }
    } else {
      // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
      yield put(deletemerchantmemberFailed(response.status));
      message.error('删除失败');
    }
  } catch (e) {
    yield put(deletemerchantmemberError(e));
    message.error('系统错误');
  }
}
export default function* merchantMemberSaga() {
  yield takeEvery(MERCHANT_MEMBER, initMerchantMemberList);
  // yield takeEvery(ROLE, initRoleList);
  yield takeEvery(MODIFY_LIST_STATUS, modifyListStatus);
  yield takeEvery(DELETE_MERCHANTMEMBER, deleteMerchantMember);
}
