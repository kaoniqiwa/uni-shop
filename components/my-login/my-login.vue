<script setup>
import httpInstance from '../../utils/http.js';
import { useUserStore } from '@/store/pinia/user.js';

import { ref } from 'vue';

const userStore = useUserStore()
const { updateUserinfo, updateToken } = userStore;

const nickName = ref('');

// 调试基础库 2.16
const getUserInfo = (e) => {
	// 判断是否获取用户信息成功
	if (e.detail.errMsg === 'getUserInfo:fail auth deny')
		return uni.$showMsg('您取消了登录授权！');

	// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
	// console.log(e.detail);
	updateUserinfo(e.detail.userInfo);

	getToken(e.detail);
};

/**
 * 基础库 2.26 及以下版本默认授权，可以直接获取用户真实信息
 * 2.27 之后接口默认未授权，获取信息为匿名数据
 *
 */
const getUserProfile = async () => {
	const res = await uni.getUserProfile({
		desc: '获取个人信息',
	});
	// console.log(res)
	// getToken(res)
};


const navigateBack = () => {
	// console.log(userStore.redirectInfo);

	if (userStore.redirectInfo?.openType && userStore.redirectInfo?.from) {
		uni[userStore.redirectInfo.openType]({
			url: userStore.redirectInfo.from,
			complete() {
				userStore.updateRedirectInfo(null)
			}
		})
	}
}

const getToken = async (info) => {
	uni.login({
		async success(res) {

			const query = {
				code: res.code,
				encryptedData: info.encryptedData,
				iv: info.iv,
				rawData: info.rawData,
				signature: info.signature,
			};

			let { data } = await httpInstance.post(
				'/api/public/v1/users/wxlogin',
				query
			);
			// 接口有问题，模拟数据
			data = {
				message: {
					user_id: 12,
					user_email_code: null,
					is_active: null,
					user_sex: '男',
					user_qq: '',
					user_tel: '',
					user_xueli: '本科',
					user_hobby: '',
					user_introduce: null,
					create_time: 1525402223,
					update_time: 1525402223,
					token:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
				},
				meta: {
					msg: '登录成功',
					status: 200,
				},
			};
			if (data.meta.status != 200) {
				return uni.$showMsg('登录失败！');
			} else {
				uni.$showMsg('登录成功');
				updateToken(data.message.token)
				navigateBack()
			}
		},
		fail() {
			uni.$showError('登录失败！');
		},
	});

};

</script>
<template>
	<view class="login-container">
		{{ nickName }}
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<!-- <button type="primary" class="btn-login" open-type="getUserInfo" @click="getUserProfile">一键登录</button> -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">
			一键登录
		</button>

		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<style lang="scss">
.login-container {
	// 登录盒子的样式
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;

	// 绘制登录盒子底部的半椭圆造型
	&::after {
		content: ' ';
		display: block;
		position: absolute;
		width: 100%;
		height: 40px;
		left: 0;
		bottom: 0;
		background-color: white;
		border-radius: 100%;
		transform: translateY(50%);
	}

	// 登录按钮的样式
	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}

	// 按钮下方提示消息的样式
	.tips-text {
		font-size: 12px;
		color: gray;
	}
}
</style>
