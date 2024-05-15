<template>
	<view class="my-search-container" @click="searchBoxHandler" :style="{'background-color':bgcolor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{ 'border-radius': radius + 'px' }">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	/**输入属性*/
	withDefaults(defineProps<{
		bgcolor : string,
		radius : number
	}>(), {
		bgcolor: '#c00000',
		radius: 18
	})

	/**自定义click事件*/
	const emits = defineEmits<(e : 'click') => void>()


	const searchBoxHandler = () => {
		emits('click')
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		// border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>