import {
	$http
} from '@escook/request-miniprogram'

const httpInstance = $http;

httpInstance.baseUrl = 'https://api-hmugo-web.itheima.net'


// 请求拦截
httpInstance.beforeRequest = function(options) {

}


// 响应拦截
httpInstance.afterRequest = function() {}


export default httpInstance;