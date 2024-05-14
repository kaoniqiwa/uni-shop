import httpInstance from '../utils/http.js'

/**轮播图*/
export function getSwiperAPI() {
	return httpInstance.get('/api/public/v1/home/swiperdata')

}

/**分类导航*/
export function getNavAPI() {
	return httpInstance.get('/api/public/v1/home/catitems')
}
/**分类导航*/
export function getFloorAPI() {
	return httpInstance.get('/api/public/v1/home/floordata')
}