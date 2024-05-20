<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app'


	import {
		onMounted,
		ref,
	} from 'vue'


	import {
		getSwiperAPI,
		getNavAPI,
		getFloorAPI
	} from '../../apis/home.js'


	import {
		useBadge
	} from '../../hooks/badge.js'

	// 设置徽标
	const {
		setTabBarBadge
	} = useBadge();



	/**轮播图*/
	const swiperList = ref([])
	const getSwiperList = async () => {
		const {
			data
		} = await getSwiperAPI()
		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}

		swiperList.value = data.message
	}

	/**分类导航*/
	const navList = ref([])
	const getNavList = async () => {
		const {
			data
		} = await getNavAPI()

		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}
		navList.value = data.message
	}

	/**楼层区域*/
	const floorList = ref([]);
	const getFloorList = async () => {
		const {
			data
		} = await getFloorAPI()

		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}
		/**处理数据，跳转到本地页面地址*/
		data.message.forEach(v => v.product_list.forEach(product => {
			product.navigator_url = product.navigator_url.replace(/.*(?=\?query)/,
				'/subpkg/goods_list/goods_list')
		}))
		floorList.value = data.message
	}
	/**分类点击*/
	const navClickHandler = (item) => {
		if (item.name === '分类') {
			uni.switchTab({
				url: "/pages/cate/cate"
			})
		}
	}
	/**导航到搜索分页*/
	const gotoSearch = () => {
		uni.navigateTo({
			url: `/subpkg/search/search`
		})
	}

	onMounted(() => {
		getSwiperList();
		getNavList();
		getFloorList();
	})
	onShow(() => {
		setTabBarBadge()
	})
</script>

<template>
	<view class="home-container">
		<!-- 使用自定义的搜索组件 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<!-- 跳转分包商品详情页 -->
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<img :src="item.image_src" alt="" />
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>

				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].navigator_url">
						<image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"
							mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">

						<template v-for="(item2, i2) in item.product_list" :key="i2">
							<navigator class="right-img-item" :url="item2.navigator_url" v-if="i2 !== 0">
								<image :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
							</navigator>
						</template>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<style lang="scss" scoped>
	.home-container {

		.search-box {
			// 设置定位效果为“吸顶”
			position: sticky;
			// 吸顶的“位置”
			top: 0;
			// 提高层级，防止被轮播图覆盖
			z-index: 999;
		}

		swiper {
			height: 330rpx;

			.swiper-item,
			image {
				width: 100%;
				height: 100%;
			}
		}


		.nav-list {
			display: flex;
			justify-content: space-around;
			margin: 15px 0;

			.nav-img {
				width: 128rpx;
				height: 140rpx;
			}
		}

		.floor-list {
			.floor-title {
				height: 60rpx;
				width: 100%;
				display: flex;
			}

			.right-img-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}

			.floor-img-box {
				display: flex;
				padding-left: 10rpx;
			}
		}
	}
</style>