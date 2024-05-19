<script setup lang="ts">
	import { ref } from 'vue';

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
		goods_state : boolean;
		goods_count : number
	}

	// 默认图片地址
	const defaultPic = ref(
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	)

	// 定义输入属性
	const props = defineProps<{
		goods : IGoods,
		showRadio ?: boolean,
		showNum ?: boolean
	}>()

	// 注册事件
	const emits = defineEmits<
		{
			(e : 'state-change', payload : { goods_id : number, goods_state : boolean }) : void;
			(e : 'count-change', payload : { goods_id : number, goods_count : number }) : void;

		}>()


	/**props.goods 是响应式对象，可以直接修改状态，但最好不要操作 props 属性，交给父组件处理*/
	const stateChangeHandler = () => {
		emits('state-change', {
			goods_id: props.goods.goods_id,
			goods_state: !props.goods.goods_state
		})
	}
	const countChangeHandler = (count : number) => {
		console.log(count)
		emits('count-change', {
			goods_id: props.goods.goods_id,
			goods_count: +count
		})
	}
</script>
<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<!-- checkbox 的样式必须在 app.vue 中声明,且该组件没有 change 事件 -->
			<checkbox v-show="showRadio" class='round' :checked="goods.goods_state" @click="stateChangeHandler" />
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic" />
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{ $filter(goods.goods_price) }}</view>
				<uni-number-box v-show="showNum" v-model="goods.goods_count" :min="1" @change="countChangeHandler" />

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
			display: flex;
			align-items: center;
			justify-content: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-evenly;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #C00000;
					font-size: 16px;
				}
			}

		}
	}
</style>