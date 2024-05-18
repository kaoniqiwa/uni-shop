<script>
import {
	defineComponent,
	ref,
	onMounted
} from 'vue';

import {
	getCateAPI
} from '../../apis/cate.js'


import {
	useBadge
} from '../../hooks/badge.js'

export default defineComponent((props, context) => {
	// 设置徽标
	useBadge()

	/**内容区域高度*/
	const wh = ref(0);

	/**选中项*/
	const active = ref(0);

	const scrollTop = ref(0);



	const getWindowInfo = () => {
		/**获取窗口信息*/
		const {
			windowHeight
		} = uni.getWindowInfo()
		wh.value = windowHeight - 50
	}

	const cateList = ref([]);
	const cateLevel2 = ref([])
	const getCateList = async () => {
		const {
			data
		} = await getCateAPI()

		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}
		cateList.value = data.message;
		activeChanged(active.value)
	}

	const activeChanged = (index) => {
		active.value = index;
		scrollTop.value = scrollTop.value ? 0 : 1
		cateLevel2.value = cateList.value[index].children || [];
	}
	const gotoGoodsList = (item) => {
		uni.navigateTo({
			url: `/subpkg/goods_list/goods_list?cid=${item.cat_id}`
		})
	}

	/**导航到搜索分页*/
	const gotoSearch = () => {
		uni.navigateTo({
			url: `/subpkg/search/search`
		})
	}
	onMounted(() => {
		getWindowInfo();
		getCateList();
	})


	return {
		wh,
		active,
		scrollTop,
		cateList,
		cateLevel2,
		activeChanged,
		gotoGoodsList,
		gotoSearch
	}
})
</script>

<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">

				<template v-for="(item, i) in cateList" :key="item.cat_id">
					<view class="left-scroll-view-item" :class="{ active: i === active }" @click="activeChanged(i)">
						{{ item.cat_name }}
					</view>
				</template>
			</scroll-view>

			<scroll-view class="right-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="item in cateLevel2" :key="item.cat_id">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title">/ {{ item.cat_name }} /</view>
					<!-- 当前二级分类下的三级分类列表 -->
					<view class="cate-lv3-list">
						<!-- 三级分类的Item项 -->
						<view class="cate-lv3-item" v-for="item3 in item.children" :key="item3.cat_id" @click="gotoGoodsList(item3)">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 三级分类的文本 -->
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<style lang="scss" scoped>
.scroll-view-container {
	display: flex;

	.left-scroll-view {
		width: 120px;

		.left-scroll-view-item {
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #FFFFFF;
				position: relative;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}

		}
	}

}

.cate-lv2-title {
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}

.cate-lv3-list {
	display: flex;
	flex-wrap: wrap;

	.cate-lv3-item {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;

		image {
			width: 60px;
			height: 60px;
		}

		text {
			font-size: 12px;
		}
	}
}
</style>