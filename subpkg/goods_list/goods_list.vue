<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import {
		getGoodsListAPI
	} from '../../apis/goods.js'


	const props = defineProps({
		cid: {
			type: String,
			default: ''
		},
		query: {
			type: String,
			default: ''
		}
	})

	/**节流阀，等待请求完成后才能继续请求*/
	const isLoading = ref(false)
	const goodsPrams = reactive({
		cid: props.cid,
		query: props.query,
		pagenum: 1,
	})

	const goodsList = ref([]);
	const total = ref(0);
	/**商品列表*/
	const getGoodsList = async () => {
		isLoading.value = true
		const {
			data
		} = await getGoodsListAPI(goodsPrams)

		if (data.meta.status !== 200) {
			uni.$showMsg()
			return
		}
		goodsList.value = [...goodsList.value, ...data.message.goods];
		total.value = data.message.total;
		isLoading.value = false;
	}

	/**上拉加载更多*/
	onReachBottom(() => {
		if (goodsList.value.length >= total.value) return uni.$showMsg('数据加载完毕')
		if (isLoading.value) return
		goodsPrams.pagenum += 1
		getGoodsList()

	})
	/**下拉刷新*/
	onPullDownRefresh(async () => {
		isLoading.value = false;
		goodsPrams.pagenum = 1;
		goodsList.value = []
		total.value = 0
		await getGoodsList()

		uni.stopPullDownRefresh()

	})
	onMounted(() => {
		getGoodsList()
	})
	const gotoDetail = (goods) => {
		uni.navigateTo({
			url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
		})
	}
</script>



<template>
	<view>
		<view class="goods-list">
			<!-- uniapp vue3 不支持组件的原生 click 事件-->
			<view v-for="item in goodsList" :key="item.goods_id" @click='gotoDetail(item)'>
				<my-goods :goods="{
				goods_id: item.goods_id,
				goods_name: item.goods_name,
				goods_price: item.goods_price,
				goods_small_logo: item.goods_small_logo,
				}"></my-goods>
			</view>
		</view>
	</view>
</template>


<style lang="scss" scoped></style>