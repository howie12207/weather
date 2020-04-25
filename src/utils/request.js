import axios from "axios";
import { Loading, Message } from "element-ui";

let loadingInstance = null; // 加载全局的loading
const instance = axios.create({
  baseURL: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
});

instance.interceptors.request.use(
  (config) => {
    loadingInstance = Loading.service({
      spinner: "fa fa-spinner fa-spin fa-3x fa-fw",
      text: "讀取資料中...",
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    loadingInstance.close();
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      Message({
        message: response.data.message,
        type: "error",
      });
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    loadingInstance.close();
    if (error.response) {
      Message({
        message: error.response.status,
        type: "error",
      });
      return Promise.reject(error);
    } else {
      Message({
        message: "請求超時，請刷新頁面重試",
        type: "error",
      });
      return Promise.reject(new Error("請求超時，請刷新頁面重試"));
    }
  }
);

export const get = (url, params, config = {}) => {
  return instance({
    method: "get",
    url,
    params,
    ...config,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const post = (url, data, config = {}) => {
  return instance({
    method: "post",
    url,
    data,
    ...config,
  })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
