<script setup>
import {
	computed
} from 'vue';
import {
	useCartStore
} from '../../store/pinia/cart.js'


import {
	useUserStore
} from '../../store/pinia/user.js'


import {
	storeToRefs
} from 'pinia'

import { createOrderAPI, prePayOrderAPI, checkOrderAPI } from '@/apis/settle.js'

const userStore = useUserStore();
const {
	address,
	token
} = storeToRefs(userStore)

const cartStore = useCartStore()
const {
	checkedGoods,
	cartCount,
	checkedCount,
	checkedPrice
} = storeToRefs(cartStore)
const {
	updateAllGoodsState
} = cartStore

const isFullChecked = computed(() => cartCount.value == checkedCount.value)

/**全选、反选*/
const toggleChecked = () => {
	updateAllGoodsState(!isFullChecked.value)
}

/**结算*/
const settlement = () => {
	if (!checkedCount.value) return uni.$showMsg('请选择要结算的商品！')
	if (!address.value) return uni.$showMsg('请选择收货地址！')
	if (!token.value) return delayNavigate()

	payOrder()
}
const payOrder = async () => {
	const orderInfo = {
		order_price: 0.1,
		consignee_addr: '广州市天河区',
		// goods: checkedGoods.value.map(goods => ({
		// 	goods_id: goods.id,
		// 	goods_number: goods.goods_count,
		// 	goods_price: goods.goods_price
		// })),
		goods: [{
			"goods_id": 5,
			"goods_number": 11,
			"goods_price": 15
		},
		{
			"goods_id": 555,
			"goods_number": 1,
			"goods_price": 15
		}]
	}
	// 发起请求创建订单
	const { data: res1 } = await createOrderAPI(orderInfo)
	console.log(res1);
	if (res1.meta.status !== 200) return uni.$showMsg('创建订单失败！')


	const { data: res2 } = await prePayOrderAPI({ order_number: res1.message.order_number })
	console.log(res2);
	if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')

	// const res3 = await uni.requestPayment(res2.message.pay)
	// console.log(res3);
	const { data: res4 } = await checkOrderAPI({ order_number: res1.message.order_number })
	console.log(res4);


	if (res4.meta.status !== 200) return uni.$showMsg('订单未支付！')
	// 3.5 检测到订单支付完成
	uni.showToast({
		title: '支付完成！',
		icon: 'success'
	})

}
const showTips = (n) => {
	uni.showToast({
		mask: true,
		icon: 'none',
		title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
	})
}
let timer = null
const delayNavigate = () => {
	let seconds = 3
	showTips(seconds)

	timer = setInterval(() => {
		seconds--
		if (seconds <= 0) {
			clearInterval(timer)

			uni.switchTab({
				url: "/pages/my/my",
				success() {
					userStore.updateRedirectInfo({
						openType: 'switchTab',
						from: "/pages/cart/cart"
					})
				}
			})
			return
		}
		showTips(seconds)
	}, 1000);
}
</script>
<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class='select' @click="toggleChecked">
			<checkbox class="round" :checked="isFullChecked" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{ $filter(checkedPrice) }}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{ cartStore.checkedCount }})</view>
	</view>
</template>


<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;

	width: 100%;
	height: 50px;
	background-color: white;
	font-size: 14px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-left: 5px;

	.select {
		display: flex;
		align-items: center;
	}

	.amount {
		color: #c00000;
	}


	.btn-settle {
		height: 50px;
		min-width: 100px;
		background-color: #c00000;
		color: white;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
	}
}
</style>