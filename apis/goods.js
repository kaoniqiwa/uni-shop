import httpInstance from '../utils/http.js'

/*商品列表搜索 */
export function getGoodsListAPI({
	query = '',
	cid = '',
	pagenum = 1,
	pagesize = 10
} = data) {
	return httpInstance.get('/api/public/v1/goods/search', {
		query,
		cid,
		pagenum,
		pagesize

	})
}



/*商品详情 */
export function getGoodsInfoAPI(goods_id) {
	return httpInstance.get('/api/public/v1/goods/detail', {
		goods_id
	})
}