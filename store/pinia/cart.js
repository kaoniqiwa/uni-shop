import {
	defineStore,
} from 'pinia'

import {
	computed,
	ref
} from 'vue'

export const useCartStore = defineStore('cart', () => {

	const cartList = ref([])
	const cartCount = computed(() => cartList.value.length)

	/**已勾选的商品数量*/
	const checkedCount = computed(() => {
		return cartList.value.filter(v => v.goods_state).length
	})
	/**已勾选商品价格合计*/
	const checkedPrice = computed(() => {
		return cartList.value.filter(v => v.goods_state).reduce((prev, cur) => {
			return prev + cur.goods_price * cur.goods_count
		}, 0)
	})

	const addToCart = (goods) => {
		const targetGoods = cartList.value.find((v) => v.goods_id === goods.goods_id)

		if (targetGoods) {
			targetGoods.goods_count++
		} else {
			cartList.value.push(goods)
		}
	}
	const updateGoodsState = (goods_id, goods_state) => {
		const targetGoods = cartList.value.find(v => v.goods_id === goods_id)
		targetGoods.goods_state = goods_state
	}
	const updateAllGoodsState = (goods_state) => {
		cartList.value.forEach(v => v.goods_state = goods_state)
	}
	const updateGoodsCount = (goods_id, goods_count) => {
		const targetGoods = cartList.value.find(v => v.goods_id === goods_id)
		targetGoods.goods_count = goods_count
	}

	const deleteGoods = (goods_id) => {
		const index = cartList.value.findIndex(v => v.goods_id === goods_id)
		if (index !== -1) {
			cartList.value.splice(index, 1)
		}

	}
	return {
		cartList,
		cartCount,
		addToCart,
		checkedPrice,
		checkedCount,
		updateGoodsState,
		updateGoodsCount,
		deleteGoods,
		updateAllGoodsState
	}
}, {
	persist: {
		// 需要持久化的字段
		paths: ['cartList'],
		storage: {
			getItem(key) {
				return uni.getStorageSync(key)
			},
			setItem(key, value) {
				uni.setStorageSync(key, value)
			}
		},
		serializer: {
			serialize: JSON.stringify,
			deserialize: JSON.parse
		},
		beforeRestore(ctx) {},
		afterRestore(ctx) {},
	}

})