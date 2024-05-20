<script setup>
	import {
		ref
	} from 'vue';

	import {
		storeToRefs
	} from 'pinia'
	import {
		useUserStore
	} from '../../store/pinia/user.js'

	const userStore = useUserStore();

	const {
		address,
		addrDetail
	} = storeToRefs(useUserStore())

	/**选择地址，保存到 pinia 中*/
	const chooseAddress = () => {
		/**获取用户收货地址,需要开通接口权限，且配置 app.json*/
		uni.chooseAddress({
			success(res) {
				userStore.updateAddress(res)
			},
			fail(e) {
				console.error(e)
			}
		})
	}
</script>

<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="!address">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址</button>
		</view>

		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ addrDetail
}}</view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>
<style lang="scss">
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;
			flex-grow: 0;
			overflow: hidden;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {
				overflow: auto;
				height: 100%;
			}
		}
	}

	.address-border {
		/**默认inline-block 和上面元素间因为换行导致留白*/
		display: block;
		width: 100%;
		height: 5px;
	}
</style>