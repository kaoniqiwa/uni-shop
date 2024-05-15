import httpInstance from '../utils/http.js'

/**分类*/
export function getCateAPI() {
	return httpInstance.get('/api/public/v1/categories')
}