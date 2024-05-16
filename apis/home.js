// import httpInstance from '../utils/http.js'
import httpClient from '../utils/axios.js'

/**轮播图*/
export function getSwiperAPI() {
	return httpClient.get('/api/public/v1/home/swiperdata')

}

/**分类导航*/
export function getNavAPI() {
	return httpClient.get('/api/public/v1/home/catitems')
}

/**楼层图*/
export function getFloorAPI() {
	return httpClient.get('/api/public/v1/home/floordata')
}