<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		getGoodsInfoAPI
	} from '../../apis/goods.js'

	const props = defineProps(['goods_id'])

	/**获取商品详情*/
	const goodsInfo = ref()
	const getGoodsInfo = async (goods_id) => {
		if (goods_id === '') return
		const {
			data
		} = await getGoodsInfoAPI(goods_id)

		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}

		/**处理图片间隙和 IOS 14 以下对 webp 的不支持*/
		data.message.goods_introduce = data.message.goods_introduce.replace(/<img/g, '<img style="display:block;"')
			.replace(/\.webp/g, '.jpg');
		goodsInfo.value = data.message;

	}

	/**图片预览功能 wx.previewImage*/
	const previewImage = (index) => {
		if (goodsInfo.value) {
			uni.previewImage({
				urls: goodsInfo.value.pics.map(p => p.pics_big),
				current: index
			})
		}
	}

	const options = ref([{
		icon: 'shop',
		text: '店铺',
		info: 0,
	}, {
		icon: 'cart',
		text: '购物车',
		info: 0
	}])


	const buttonGroup = ref([{
			text: '加入购物车',
			backgroundColor: '#ff0000',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#ffa200',
			color: '#fff'
		}
	])


	const onclick = (e) => {

		if (e.content.text === '购物车') {
			uni.switchTab({
				url: '/pages/cart/cart'
			})
		}

	}


	onMounted(() => {
		getGoodsInfo(props.goods_id)
	})
</script>

<template>
	<!-- 轮播图区域 -->
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<swiper-item v-for="(item, i) in goodsInfo?.pics" :key="i">
			<image :src="item.pics_big" @click="previewImage(i)"></image>
		</swiper-item>
	</swiper>

	<!-- 商品信息区域 -->
	<view class="goods-info-box">
		<!-- 商品价格 -->
		<view class="price">￥{{goodsInfo?.goods_price}}</view>
		<!-- 信息主体区域 -->
		<view class="goods-info-body">
			<!-- 商品名称 -->
			<view class="goods-name">{{goodsInfo?.goods_name}}</view>
			<!-- 收藏 -->
			<view class="favi">
				<uni-icons type="star" size="18" color="gray"></uni-icons>
				<text>收藏</text>
			</view>
		</view>
		<!-- 运费 -->
		<view class="yf">快递：免运费</view>
	</view>

	<!-- 商品介绍 -->
	<view class="hello" v-html="goodsInfo?.goods_introduce"></view>

	<view class="goods_nav">
		<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click='onclick' />
	</view>

</template>

<style lang="scss" scoped>
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}

		}

		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	// padding-bottom

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>

<!-- 不能 scopedv -->
<style>
	page {
		padding-bottom: 50px;
	}
</style>