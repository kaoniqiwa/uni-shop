<script setup>
	import {
		computed,
		onBeforeMount,
		ref
	} from 'vue';
	import {
		debounce
	} from 'lodash'

	// import {
	// 	debounce
	// } from '../../utils/debounce.js'

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
		saveSearchHistory(query)
	}
	/**点击跳转详情*/
	const gotoDetail = (goods_id) => {
		uni.navigateTo({
			url: `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`
		})
	}

	/**搜索历史*/
	const historyList = ref([])
	const historys = computed(() => Array.from(historyList.value).reverse())
	const saveSearchHistory = (query) => {

		const index = historyList.value.findIndex((v) => v === query)
		if (index !== -1) {
			historyList.value.splice(index, 1)
		}
		historyList.value.push(query)

		/**数据持久化 wx.setStorageSync*/
		uni.setStorageSync('search_history', JSON.stringify(historyList.value))
	}
	const getHistoryList = () => {
		const searchHistory = uni.getStorageSync('search_history');
		if (searchHistory) {
			historyList.value = JSON.parse(searchHistory)
		}
	}

	/**清空历史数据*/
	const clean = () => {
		historyList.value = [];
		uni.removeStorageSync('search_history')
	}

	const gotoGoodsList = (query) => {
		uni.navigateTo({
			url: `/subpkg/goods_list/goods_list?query=${query}`
		})
	}
	/**服务端不会触发该钩子*/
	onBeforeMount(() => {
		getHistoryList()

	})
</script>

<template>
	<view class="search-box">
		<!-- 使用 uni-ui 提供的搜索组件,真机查看焦点功能 -->
		<uni-search-bar placeholder="请输入搜索内容" @input="input" :radius="100" cancelButton="none"
			:focus="true"></uni-search-bar>

		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResult.length">
			<view class="sugg-item" v-for="(item, i) in searchResult" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>

	</view>

</template>

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

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 5px;


		}
	}




	::v-deep {
		.uni-searchbar {
			background-color: #c00000;
		}

		.uni-tag {
			margin-right: 5px;
			background-color: #8f939c6b;
			border: none;
			color: #000000a8;
			font-weight: bold;
			font-size: 14px;
		}
	}
</style>