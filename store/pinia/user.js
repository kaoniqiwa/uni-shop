import {
	defineStore
} from 'pinia'
import {
	computed,
	reactive,
	ref
} from 'vue'
import myLoginVue from '../../components/my-login/my-login.vue'


export const useUserStore = defineStore('user', () => {
	const token = ref(null)
	const address = ref()
	const userinfo = ref()
	const addrDetail = computed(() => address.value?.provinceName + address.value?.cityName + address.value
		?.countyName +
		address.value?.detailInfo)

	const updateAddress = (data) => {
		address.value = data;
	}


	const updateUserinfo = (info) => {
		userinfo.value = info;
	}
	return {
		token,
		address,
		addrDetail,
		updateAddress,
		userinfo,
		updateUserinfo
	}
}, {
	persist: {
		key: "user",
		paths: ['address', 'token', 'userinfo'],
		storage: {
			getItem(key) {
				return uni.getStorageSync(key)
			},
			setItem(key, value) {
				uni.setStorageSync(key, value)
			}
		},
		afterRestore(ctx) {}
	}
})