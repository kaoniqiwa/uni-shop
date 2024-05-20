<script setup>
	import {
		nextTick,
		onMounted,
		ref
	} from 'vue';
	import {
		useBadge
	} from '../../hooks/badge.js'

	import {
		useCartStore
	} from '../../store/pinia/cart.js'

	const {
		setTabBarBadge
	} = useBadge()
	const cartStore = useCartStore()

	/**滑动删除商品*/
	const rightOptions = ref([{
		text: '删除',
		style: {
			backgroundColor: '#c00000'
		}
	}])

	/**选择商品*/
	const stateChange = ({
		goods_id,
		goods_state
	}) => {
		cartStore.updateGoodsState(goods_id, goods_state)
	}
	/**修改商品数量*/
	const countChange = ({
		goods_id,
		goods_count
	}) => {
		cartStore.updateGoodsCount(goods_id, goods_count)

	}
	/**滑动删除商品*/
	const clickActionItem = (e, goods_id) => {
		if (e.index === 0) {
			cartStore.deleteGoods(goods_id);
			setTabBarBadge()
		}
	}
	onMounted(() => {
		useBadge()
	})
</script>

<template>
	<view class="cart-container" v-if="cartStore.cartList.length">
		<!-- 收货地址 -->
		<my-address></my-address>

		<view class="cart-title">
			<uni-icons type="shop"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 左滑删除 -->
		<uni-swipe-action>
			<template v-for="item in cartStore.cartList" :key="item.goods_id">
				<uni-swipe-action-item :right-options="rightOptions" @click="clickActionItem($event,item.goods_id)">
					<my-goods :goods="item" :showRadio="true" :show-num="true" @state-change="stateChange"
						@count-change="countChange"></my-goods>
				</uni-swipe-action-item>
			</template>
		</uni-swipe-action>

		<!-- 结算 -->
		<my-settle></my-settle>
	</view>

	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
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

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>