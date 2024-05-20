import {
	defineStore
} from 'pinia'
import {
	computed,
	ref
} from 'vue'


export const useUserStore = defineStore('user', () => {
	const address = ref()
	const addrDetail = computed(() => address.value?.provinceName + address.value?.cityName + address.value
		?.countyName +
		address.value?.detailInfo)

	const updateAddress = (data) => {
		address.value = data
	}

	return {
		address,
		addrDetail,
		updateAddress
	}
}, {
	persist: {
		key: "address",
		paths: ['address'],
		storage: {
			getItem(key) {
				return uni.getStorageSync(key)
			},
			setItem(key, value) {
				uni.setStorageSync(key, value)
			}
		}
	}
})