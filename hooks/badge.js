import {
	storeToRefs
} from 'pinia'

import {
	useCartStore
} from '../store/pinia/cart.js'
import {
	onShow
} from '@dcloudio/uni-app'

export function useBadge() {

	const cartStore = useCartStore()
	const {
		cartCount
	} = storeToRefs(cartStore);


	const setTabBarBadge = () => {
		if (cartCount.value) {
			// 更新tabBar右上角文本
			uni.setTabBarBadge({
				index: 2,
				text: cartCount.value.toString()
			})
		} else {
			uni.hideTabBarRedDot({
				index: 2
			})
		}

	}
	onShow(() => {
		setTabBarBadge()
	})

	return {
		setTabBarBadge
	}

}