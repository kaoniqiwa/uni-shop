import httpInstance from '../utils/http.js'

/**搜索建议查询 */
export function getQSearchAPI(query) {
	return httpInstance.get('/api/public/v1/goods/qsearch', {
		query
	})
}