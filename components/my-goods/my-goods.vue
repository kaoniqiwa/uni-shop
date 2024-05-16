<script setup lang="ts">
	import { onMounted, ref, getCurrentInstance } from 'vue';

	interface IGoods {
		goods_id : number;
		cat_id : number;
		goods_name : string;
		goods_price : number;
		goods_number : number;
		goods_weight : number;
		goods_big_logo : string;
		goods_small_logo : string;
		add_time : number;
		upd_time : number;
		hot_mumber : number;
		is_promote : false;
		cat_one_id : number;
		cat_two_id : number;
		cat_three_id : number;
	}


	defineProps<{
		goods : IGoods
	}>()

	const defaultPic = ref(
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	)
</script>
<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{ $filter(goods.goods_price) }}</view>
			</view>
		</view>
	</view>
</template>


<style lang="scss" scoped>
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>