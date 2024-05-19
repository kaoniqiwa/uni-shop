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
	const updateGoodsCount = (goods_id, goods_count) => {
		const targetGoods = cartList.value.find(v => v.goods_id === goods_id)
		targetGoods.goods_count = goods_count
	}
	return {
		cartList,
		cartCount,
		addToCart,
		updateGoodsState,
		updateGoodsCount
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
				return uni.setStorageSync(key, value)
			}
		},
		afterRestore(ctx) {}
	}

})