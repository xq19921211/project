/**
 * Created by xu.long on 2018/5/17.
 */

import fetch from 'isomorphic-fetch';

import { urlGenerator } from './util';

export function request(options) {
  let path = options.url;
  options.xhrFields = {
    withCredentials: true,
  };
  return new Promise((resolve, reject) => {
    fetch(path, options)
      .then(
        response => {
          if (response.status === 401) {
            // alert(response.status);
            window.myHistory.push('/login');
          } else {
            resolve(response);
          }
        },
        error => reject(error),
      )
      .catch(e => reject(e));
  });
}

const requsetOptions = {
  credentials: 'include',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  xhrFields: {
    withCredentials: true,
  },
};

export const getRequestUrl = url => window.hempConfig.apiPath + url;

function generateRequestMethods(type) {
  return function(url, params) {
    return new Promise((resolve, reject) => {
      let ajaxMethod = null;
      if (type === 'get') {
        ajaxMethod = fetch(urlGenerator(getRequestUrl(url), params), {
          ...requsetOptions,
          method: 'get',
        });
      } else {
        ajaxMethod = fetch(getRequestUrl(url), {
          ...requsetOptions,
          method: 'post',
          body: typeof params === 'string' ? params : JSON.stringify(params),
        });
      }

      ajaxMethod
        .then(res => {
          if (res.status === 401) {
            window.myHistory.push('/login');
            reject(res);
          }
          return res;
        })
        .then(res => res.json())
        .then(res => {
          if (res.code !== 0) {
            return reject(res);
          }
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };
}
export const post = generateRequestMethods('post');
export const get = generateRequestMethods('get');
