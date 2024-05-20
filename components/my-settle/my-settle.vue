<script setup>
	import {
		computed
	} from 'vue';
	import {
		useCartStore
	} from '../../store/pinia/cart.js'
	import {
		storeToRefs
	} from 'pinia'

	const cartStore = useCartStore()
	const {
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
</script>
<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class='select' @click="toggleChecked">
			<checkbox class="round" :checked="isFullChecked" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{$filter(checkedPrice)}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle">结算({{cartStore.checkedCount}})</view>
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