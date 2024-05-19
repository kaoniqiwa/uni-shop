<script setup>
	import {
		onMounted
	} from 'vue';
	import {
		useBadge
	} from '../../hooks/badge.js'

	import {
		useCartStore
	} from '../../store/pinia/cart.js'

	useBadge()
	const cartStore = useCartStore()

	const stateChange = ({
		goods_id,
		goods_state
	}) => {
		cartStore.updateGoodsState(goods_id, goods_state)
	}
	const countChange = ({
		goods_id,
		goods_count
	}) => {
		cartStore.updateGoodsCount(goods_id, goods_count)

	}
	onMounted(() => {})
</script>

<template>
	<view class="cart-container">
		<view class="cart-title">
			<uni-icons type="shop"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<template v-for="item in cartStore.cartList" :key="item.goods_id">
			<my-goods :goods="item" :showRadio="true" :show-num="true" @state-change="stateChange"
				@count-change="countChange"></my-goods>
		</template>

	</view>
</template>



<style lang="scss" scoped>
	.cart-container {
		padding-bottom: 50px;

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			padding-left: 5px;
			border-bottom: 1px solid #EFEFEF;

			.cart-title-text {
				font-size: 14px;
				margin-left: 10px;
			}
		}
	}
</style>