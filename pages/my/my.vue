<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app'

	import {
		useBadge
	} from '../../hooks/badge.js'

	import {
		storeToRefs
	} from 'pinia'
	import {
		useUserStore
	} from '../../store/pinia/user.js'

	// 设置徽标
	const {
		setTabBarBadge
	} = useBadge();
	const userStore = useUserStore();

	const {
		token
	} = storeToRefs(userStore)

	onShow(() => {
		setTabBarBadge()
	})
</script>
<template>
	<view class='my-container'>
		<my-userinfo v-if="token"></my-userinfo>
		<my-login v-else></my-login>
	</view>
</template>


<style lang="scss" scoped>

</style>