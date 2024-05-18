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
		const targetGood = cartList.value.find((v) => v.goods_id === goods.goods_id)

		if (targetGood) {
			targetGood.goods_count++
		} else {
			cartList.value.push(goods)
		}
	}
	return {
		cartList,
		cartCount,
		addToCart
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
		}
	}

})