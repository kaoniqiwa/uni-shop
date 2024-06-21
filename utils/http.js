import { $http } from '@escook/request-miniprogram';

const httpInstance = $http;

httpInstance.baseUrl = 'https://api-hmugo-web.itheima.net';

// 请求拦截
httpInstance.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中',
  });

  if (options.url.includes('/my/')) {
    options.header.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo';
  }
};

// 响应拦截
httpInstance.afterRequest = function () {
  uni.hideLoading();
};

export default httpInstance;
