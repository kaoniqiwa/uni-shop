<template>
	<view class="search-box">
		<!-- 使用 uni-ui 提供的搜索组件 -->
		<uni-search-bar placeholder="请输入搜索内容" @input="input" :radius="100" cancelButton="none"
			:focus="true"></uni-search-bar>


		<!-- 搜索建议列表 -->
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item, i) in searchResult" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>


	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		debounce
	} from '../../utils/debounce.js'
	import {
		getQSearchAPI
	} from '../../apis/search.js';

	const searchValue = ref('')

	/**输入处理*/
	const input = debounce((e) => {
		searchValue.value = e;
		// 搜索内容不为空，则发起请求
		getSearchList(searchValue.value)
	}, 500)

	/**搜索建议查询*/
	const searchResult = ref([])
	const getSearchList = async (query) => {
		if (query === '') {
			searchResult.value = []
			return
		}
		const {
			data
		} = await getQSearchAPI(query)
		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}
		searchResult.value = data.message
	}

	const gotoDetail = () => {}
</script>

<style lang="scss" scoped>
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}


	::v-deep .uni-searchbar {
		background-color: #c00000;

	}
</style>