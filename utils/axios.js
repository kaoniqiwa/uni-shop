import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'

axios.defaults.adapter = mpAdapter;

const httpClient = axios.create({
	baseURL: 'https://api-hmugo-web.itheima.net'
})

httpClient.interceptors.request.use((config) => {

	uni.showLoading({
		title: "数据加载中"
	})
	return config;
}, (err) => {
	return Promise.reject(error);
})

httpClient.interceptors.response.use((response) => {
	uni.hideLoading()
	return response
}, (error) => {
	return Promise.reject(error);
})
export default httpClient