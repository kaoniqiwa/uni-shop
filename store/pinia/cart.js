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
		updateGoodsState,
		updateGoodsCount,
		deleteGoods
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